import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import {
  IConcertRepository,
  IUserRepository,
  IReservationRepository,
  IReservationAuditRepository,
} from '@core/repository';

import { ConcertEntity, ReservationEntity, UserEntity } from '@core/entity';
import { AppException } from '@common/exception';
import { Action } from '@prisma/client';

@Injectable()
export class ReserveUseCase {
  constructor(
    private concertRepo: IConcertRepository,
    private userRepo: IUserRepository,
    private reservationRepo: IReservationRepository,
    private reservationAuditRepo: IReservationAuditRepository,
  ) {}

  async findConcert(concertId: number): Promise<ConcertEntity> {
    return this.concertRepo.findById(concertId);
  }

  async findUser(userId: number): Promise<UserEntity> {
    return this.userRepo.findById(userId);
  }

  async findReservation(reservationId): Promise<ReservationEntity> {
    return this.reservationRepo.findById(reservationId);
  }

  async isUserReserveConcert(
    concertId: number,
    userId: number,
  ): Promise<boolean> {
    const tx = await this.reservationRepo.getTx();
    const reservations = await tx.findMany({ where: { userId, concertId } });
    return !isEmpty(reservations);
  }

  async isSeatAvailable(concert: ConcertEntity): Promise<boolean> {
    const tx = await this.reservationRepo.getTx();

    const reservationCount = await tx.count({
      where: { concertId: concert.id },
    });

    return reservationCount < concert.seat;
  }

  async createAudit(reservation: ReservationEntity, action: Action) {
    return this.reservationAuditRepo.create(reservation, action);
  }

  async add(concertId: number, userId: number): Promise<ReservationEntity> {
    return this.reservationRepo.book(concertId, userId);
  }

  async remove(reservationId: number): Promise<ReservationEntity> {
    return this.reservationRepo.cancel(reservationId);
  }

  async reserve(concertId: number, userId: number): Promise<ReservationEntity> {
    const user = await this.findUser(userId);

    if (isEmpty(user)) {
      throw AppException.userNotFound();
    }

    const concert = await this.findConcert(concertId);

    if (isEmpty(concert)) {
      throw AppException.concertNotFound();
    }

    if (!(await this.isSeatAvailable(concert))) {
      throw AppException.concertFull();
    }

    if (await this.isUserReserveConcert(concertId, userId)) {
      throw AppException.concertWasReserve();
    }

    const reservation = await this.add(concertId, userId);
    await this.createAudit(reservation, Action.RESERVE);

    return reservation;
  }

  async cancel(reservationId: number): Promise<void> {
    const reservation = await this.findReservation(reservationId);

    if (!reservation) {
      throw AppException.reservationNotFound();
    }

    await this.remove(reservation.id);
    await this.createAudit(reservation, Action.CANCEL);
  }
}

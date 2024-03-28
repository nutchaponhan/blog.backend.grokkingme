import { Injectable } from '@nestjs/common';
import { keyBy, map } from 'lodash';

import {
  IConcertRepository,
  IReservationRepository,
} from '@src/core/repository';
import { ConcertEntity, ReservationEntity } from '@src/core/entity';

@Injectable()
export class ShowUserConcertsUseCase {
  constructor(
    private concertRepo: IConcertRepository,
    private reservationRepository: IReservationRepository,
  ) {}

  async getConcerts(): Promise<ConcertEntity[]> {
    return this.concertRepo.findAll();
  }

  async getReservations(userId: number): Promise<ReservationEntity[]> {
    return this.reservationRepository.findAllInUser(userId);
  }

  mapUserReservation(
    reservations: ReservationEntity[],
  ): Record<string, ReservationEntity> {
    return keyBy(reservations, 'concertId');
  }

  async getAllConcerts(userId: number): Promise<ConcertEntity[]> {
    const concerts = await this.getConcerts();
    const reservations = await this.getReservations(userId);

    const userMapReservations = this.mapUserReservation(reservations);

    return map(concerts, (concert: ConcertEntity) => {
      return {
        ...concert,
        isReserved: !!userMapReservations[concert.id],
        reservationId: userMapReservations[concert.id]?.id || null,
      };
    });
  }
}

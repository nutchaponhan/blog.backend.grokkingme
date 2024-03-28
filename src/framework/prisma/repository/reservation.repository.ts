import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { map } from 'lodash';
import { Prisma } from '@prisma/client';

import { IReservationRepository } from '@src/core/repository';
import { ReservationEntity } from '@src/core/entity';

import { ReservationMapper } from '../mapper';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(private txHost: TransactionHost<TransactionalAdapterPrisma>) {}

  async getTx(): Promise<Prisma.ReservationDelegate> {
    const tx = this.txHost.tx.reservation;
    return tx;
  }

  async findById(id: number): Promise<ReservationEntity> {
    const tx = await this.getTx();
    const reservations = await tx.findFirst({ where: { id } });
    return ReservationMapper.toEntity(reservations);
  }

  async findAll(): Promise<ReservationEntity[]> {
    const tx = await this.getTx();
    const reservations = await tx.findMany();
    return map(reservations, ReservationMapper.toEntity);
  }

  async findAllInUser(userId: number): Promise<ReservationEntity[]> {
    const tx = await this.getTx();
    const reservations = await tx.findMany({ where: { userId } });
    return map(reservations, ReservationMapper.toEntity);
  }

  async book(concertId: number, userId: number): Promise<ReservationEntity> {
    const tx = await this.getTx();
    const booked = await tx.create({ data: { concertId, userId } });
    return ReservationMapper.toEntity(booked);
  }

  async cancel(reservationId: number): Promise<ReservationEntity> {
    const tx = await this.getTx();
    const canceled = await tx.delete({ where: { id: reservationId } });
    return ReservationMapper.toEntity(canceled);
  }
}

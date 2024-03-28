import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { map } from 'lodash';
import { Prisma, Action } from '@prisma/client';

import { IReservationAuditRepository } from '@src/core/repository';
import { ReservationEntity, ReservationAuditEntity } from '@src/core/entity';

import { ReservationAuditMapper } from '../mapper';

@Injectable()
export class ReservationAuditRepository implements IReservationAuditRepository {
  constructor(private txHost: TransactionHost<TransactionalAdapterPrisma>) {}

  async getTx(): Promise<Prisma.ReservationAuditDelegate> {
    const tx = this.txHost.tx.reservationAudit;
    return tx;
  }

  async findById(id: number): Promise<ReservationAuditEntity> {
    const tx = await this.getTx();
    const reservations = await tx.findFirst({ where: { id } });
    return ReservationAuditMapper.toEntity(reservations);
  }

  async findAll(): Promise<ReservationAuditEntity[]> {
    const tx = await this.getTx();
    const reservations = await tx.findMany({
      select: {
        id: true,
        createdAt: true,
        action: true,
        user: { select: { firstname: true, lastname: true } },
        concert: { select: { name: true } },
      },
    });

    const reservationsWithExtraData = map(reservations, (item) => ({
      ...item,
      fullname: `${item?.user?.firstname} ${item?.user?.lastname}`,
      concertName: `${item?.concert?.name}`,
    }));

    return map(reservationsWithExtraData, (d: any) =>
      ReservationAuditMapper.toEntity(d),
    );
  }

  async findAllOfUser(userId: number): Promise<ReservationAuditEntity[]> {
    const tx = await this.getTx();
    const reservations = await tx.findMany({
      where: { userId },
      select: {
        id: true,
        createdAt: true,
        action: true,
        user: { select: { firstname: true, lastname: true } },
        concert: { select: { name: true } },
      },
    });

    const reservationsWithExtraData = map(reservations, (item) => ({
      ...item,
      fullname: `${item?.user?.firstname} ${item?.user?.lastname}`,
      concertName: `${item?.concert?.name}`,
    }));

    return map(reservationsWithExtraData, (d: any) =>
      ReservationAuditMapper.toEntity(d),
    );
  }

  async create(reservation: ReservationEntity, action: Action): Promise<void> {
    const tx = await this.getTx();
    await tx.create({
      data: {
        userId: reservation.userId,
        concertId: reservation.concertId,
        action,
      },
    });
  }
}

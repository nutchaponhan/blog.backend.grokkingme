import { Prisma, Action } from '@prisma/client';

import { ReservationEntity, ReservationAuditEntity } from '../entity';

export abstract class IReservationAuditRepository {
  abstract getTx(): Promise<Prisma.ReservationAuditDelegate>;

  abstract findById(
    reservationAuditId: number,
  ): Promise<ReservationAuditEntity>;

  abstract findAll(): Promise<ReservationAuditEntity[]>;

  abstract findAllOfUser(userId: number): Promise<ReservationAuditEntity[]>;

  abstract create(
    reservation: ReservationEntity,
    action: Action,
  ): Promise<void>;
}

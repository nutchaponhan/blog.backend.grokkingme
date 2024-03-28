import { Prisma } from '@prisma/client';

import { ReservationEntity } from '../entity';

export abstract class IReservationRepository {
  abstract getTx(): Promise<Prisma.ReservationDelegate>;

  abstract findById(reservationId: number): Promise<ReservationEntity>;

  abstract findAll(): Promise<ReservationEntity[]>;

  abstract findAllInUser(userId: number): Promise<ReservationEntity[]>;

  abstract book(concertId: number, userId: number): Promise<ReservationEntity>;

  abstract cancel(reservationId: number): Promise<ReservationEntity>;
}

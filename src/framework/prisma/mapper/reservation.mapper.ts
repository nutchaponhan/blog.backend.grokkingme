import { plainToClass } from 'class-transformer';

import { ReservationEntity } from '@core/entity';

import { Reservation } from '@prisma/client';

export class ReservationMapper {
  private constructor() {
    throw new Error(
      'PrismaMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(reservation: Reservation): ReservationEntity {
    return plainToClass(ReservationEntity, reservation);
  }
}

import { plainToClass } from 'class-transformer';

import { ReservationAuditEntity } from '@core/entity';

import { ReservationAudit } from '@prisma/client';

export class ReservationAuditMapper {
  private constructor() {
    throw new Error(
      'PrismaMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(
    reservationAudit: ReservationAudit,
  ): ReservationAuditEntity {
    return plainToClass(ReservationAuditEntity, reservationAudit);
  }
}

import { plainToClass } from 'class-transformer';

import { ConcertEntity } from '@core/entity';

import { Concert } from '@prisma/client';

export class ConcertMapper {
  private constructor() {
    throw new Error(
      'PrismaMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(concert: Concert): ConcertEntity {
    return plainToClass(ConcertEntity, concert);
  }
}

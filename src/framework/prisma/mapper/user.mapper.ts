import { plainToClass } from 'class-transformer';

import { UserEntity } from '@core/entity';

import { User } from '@prisma/client';

export class UserMapper {
  private constructor() {
    throw new Error(
      'PrismaMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(user: User): UserEntity {
    return plainToClass(UserEntity, user);
  }
}

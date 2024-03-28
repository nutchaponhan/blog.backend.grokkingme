import { Prisma } from '@prisma/client';

import { UserEntity } from '../entity';

export abstract class IUserRepository {
  abstract getTx(): Prisma.TransactionClient;
  abstract findById(id: number): Promise<UserEntity | null>;
  abstract create(user: UserEntity): Promise<UserEntity>;
}

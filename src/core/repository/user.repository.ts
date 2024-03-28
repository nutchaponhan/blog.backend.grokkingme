import { Prisma } from '@prisma/client';

import { CreateUserDto } from '@/core/dto';
import { UserEntity } from '@/core/entity';

type UserSelector = Prisma.UserSelect;

export abstract class IUserRepository {
  abstract getTx(): Prisma.TransactionClient;
  abstract findById(id: number, selectors: UserSelector): Promise<UserEntity>;
  abstract create(user: CreateUserDto): Promise<UserEntity>;
}

import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

import { UserEntity } from '@/core/entity';
import { IUserRepository } from '@/core/repository';

import { UserMapper } from '../mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private txHost: TransactionHost<TransactionalAdapterPrisma>) {}

  async findById(id: number): Promise<UserEntity | null> {
    return this.txHost.tx.user.findFirst({ where: { id } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.txHost.tx.user.create({ data: user });
    return UserMapper.toEntity(newUser);
  }
}

import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Prisma } from '@prisma/client';

import { UserEntity } from '@/core/entity';
import { IUserRepository } from '@/core/repository';

import { UserMapper } from '../mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  getTx(): Prisma.TransactionClient {
    return this.txHost.tx;
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.getTx().user.findFirst({ where: { id } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.getTx().user.create({ data: user });
    return UserMapper.toEntity(newUser);
  }
}

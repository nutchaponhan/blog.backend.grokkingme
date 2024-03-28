import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from '@/core/dto';
import { UserEntity } from '@/core/entity';
import { IUserRepository } from '@/core/repository';

import { UserMapper } from '../mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  getTx(): Prisma.TransactionClient {
    return this.txHost.tx;
  }

  async findById(
    id: number,
    selectors: Prisma.UserSelect,
  ): Promise<UserEntity> {
    const findArgs: Prisma.UserFindFirstArgs = {
      where: {
        id,
      },
      select: selectors,
    };

    const user = await this.getTx().user.findFirst(findArgs);
    return user ? UserMapper.toEntity(user) : null;
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.getTx().user.create({
      data: {
        email: data.email,
        password: data.password,
        profile: {
          create: {
            firstname: data.firstname,
            lastname: data.lastname,
          },
        },
        provider: {
          connectOrCreate: {
            where: {
              type: data.channel,
            },
            create: {
              type: data.channel,
            },
          },
        },
        role: {
          connectOrCreate: {
            where: {
              title: data.role,
            },
            create: {
              title: data.role,
            },
          },
        },
      },
    });

    return UserMapper.toEntity(newUser);
  }
}

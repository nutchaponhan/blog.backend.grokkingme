import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { map } from 'lodash';
import { Prisma } from '@prisma/client';

import { IConcertRepository } from '@src/core/repository';
import { CreateConcertDto } from '@src/core/dto';
import { ConcertEntity } from '@src/core/entity';

import { ConcertMapper } from '../mapper';

@Injectable()
export class ConcertRepository implements IConcertRepository {
  constructor(private txHost: TransactionHost<TransactionalAdapterPrisma>) {}

  async getTx(): Promise<Prisma.ConcertDelegate> {
    const tx = this.txHost.tx.concert;
    return tx;
  }

  async findAll(): Promise<ConcertEntity[]> {
    const allConcerts = await this.txHost.tx.concert.findMany();
    return map(allConcerts, ConcertMapper.toEntity);
  }

  async findById(id: number): Promise<ConcertEntity> {
    const concert = await this.txHost.tx.concert.findFirst({ where: { id } });
    return ConcertMapper.toEntity(concert);
  }

  async create(concert: CreateConcertDto): Promise<ConcertEntity> {
    const newConcert = await this.txHost.tx.concert.create({
      data: {
        name: concert.name,
        description: concert.description,
        seat: concert.seat,
        createdById: concert.createdById,
      },
    });
    return ConcertMapper.toEntity(newConcert);
  }

  async deleteById(id: number): Promise<ConcertEntity> {
    const deletedConcert = await this.txHost.tx.concert.delete({
      where: { id },
    });
    return ConcertMapper.toEntity(deletedConcert);
  }
}

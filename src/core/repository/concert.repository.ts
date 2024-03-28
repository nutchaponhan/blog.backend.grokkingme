import { Prisma } from '@prisma/client';

import { ConcertEntity } from '../entity';
import { CreateConcertDto } from '../dto';

export abstract class IConcertRepository {
  abstract getTx(): Promise<Prisma.ConcertDelegate>;

  abstract findAll(): Promise<ConcertEntity[]>;

  abstract findById(id: number): Promise<ConcertEntity>;

  abstract create(concert: CreateConcertDto): Promise<ConcertEntity>;

  abstract deleteById(id: number): Promise<ConcertEntity>;
}

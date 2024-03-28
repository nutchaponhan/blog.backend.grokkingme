import { Injectable } from '@nestjs/common';

import { IConcertRepository } from '@src/core/repository';
import { ConcertEntity } from '@src/core/entity';

@Injectable()
export class ShowConcertsUseCase {
  constructor(private concertRepo: IConcertRepository) {}

  async getAllConcerts(): Promise<ConcertEntity[]> {
    return await this.concertRepo.findAll();
  }
}

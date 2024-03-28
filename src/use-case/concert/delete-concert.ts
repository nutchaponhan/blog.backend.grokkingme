import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import {
  IConcertRepository,
  IReservationRepository,
} from '@src/core/repository';
import { ConcertEntity } from '@src/core/entity';
import { AppException } from '@src/common';

@Injectable()
export class DeleteConcertUseCase {
  constructor(
    private concertRepo: IConcertRepository,
    private reservationRepository: IReservationRepository,
  ) {}

  async findConcert(concertId: number): Promise<ConcertEntity> {
    return this.concertRepo.findById(concertId);
  }

  async canDeleteConcert(concertId: number): Promise<boolean> {
    const tx = await this.reservationRepository.getTx();
    const reserves = await tx.findMany({
      where: { concertId },
    });
    return isEmpty(reserves);
  }

  async delete(concertId: number): Promise<ConcertEntity> {
    const concert = await this.findConcert(concertId);

    if (isEmpty(concert)) {
      throw AppException.concertNotFound();
    }

    if (!(await this.canDeleteConcert(concertId))) {
      throw AppException.cannotDeleteConcert();
    }

    return this.concertRepo.deleteById(concertId);
  }
}

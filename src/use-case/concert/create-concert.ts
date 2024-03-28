import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { IConcertRepository, IUserRepository } from '@src/core/repository';
import { CreateConcertDto } from '@src/core/dto';
import { ConcertEntity, UserEntity } from '@src/core/entity';
import { AppException } from '@src/common';

@Injectable()
export class CreateConcertUseCase {
  constructor(
    private concertRepo: IConcertRepository,
    private userRepo: IUserRepository,
  ) {}

  async findAdmin(userId: number): Promise<UserEntity> {
    return this.userRepo.findById(userId);
  }

  async create(concertDto: CreateConcertDto): Promise<ConcertEntity> {
    const admin = await this.findAdmin(concertDto.createdById);

    if (isEmpty(admin)) {
      throw AppException.userNotFound();
    }

    return this.concertRepo.create(concertDto);
  }
}

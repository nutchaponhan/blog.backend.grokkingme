import { Injectable } from '@nestjs/common';

import { IUserRepository, IReservationAuditRepository } from '@core/repository';

import { ReservationAuditEntity, UserEntity } from '@core/entity';
import { AppException } from '@src/common';

@Injectable()
export class HistoryReservationUseCase {
  constructor(
    private userRepo: IUserRepository,
    private reservationAuditRepo: IReservationAuditRepository,
  ) {}

  async findUser(userId: number): Promise<UserEntity> {
    return this.userRepo.findById(userId);
  }

  async getAllHistory(): Promise<ReservationAuditEntity[]> {
    return this.reservationAuditRepo.findAll();
  }

  async getUserHistory(userId: number): Promise<ReservationAuditEntity[]> {
    const user = await this.findUser(userId);

    if (!user) {
      throw AppException.userNotFound();
    }

    return this.reservationAuditRepo.findAllOfUser(userId);
  }
}

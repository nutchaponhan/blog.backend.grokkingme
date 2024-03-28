import { Module } from '@nestjs/common';

import { ReserveUseCase, HistoryReservationUseCase } from '@use-case/index';

import { ReservationUserController } from './reservation.user.controller';
import { ReservationAdminController } from './reservation.admin.controller';

@Module({
  imports: [],
  providers: [ReserveUseCase, HistoryReservationUseCase],
  controllers: [ReservationUserController, ReservationAdminController],
  exports: [],
})
export class ReservationModule {}

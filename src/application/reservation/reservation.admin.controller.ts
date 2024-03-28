import { Controller, Get } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';

import { HistoryReservationUseCase } from '@src/use-case';

@Controller({ path: '/api/admin/reservations' })
export class ReservationAdminController {
  constructor(private historyReservationUseCase: HistoryReservationUseCase) {}

  @Transactional()
  @Get()
  async history() {
    const reservation = await this.historyReservationUseCase.getAllHistory();
    return reservation;
  }
}

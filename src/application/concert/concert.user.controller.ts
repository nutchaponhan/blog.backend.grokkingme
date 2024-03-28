import { Controller, Get, Query } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';

import { ShowUserConcertsUseCase } from '@src/use-case';
import { UserReservationDto } from '@src/core/dto';

@Controller({ path: '/api/user/concerts' })
export class ConcertUserController {
  constructor(private showUserConcertsUseCase: ShowUserConcertsUseCase) {}

  @Transactional()
  @Get()
  async showConcerts(@Query() query: UserReservationDto): Promise<any> {
    return this.showUserConcertsUseCase.getAllConcerts(query.userId);
  }
}

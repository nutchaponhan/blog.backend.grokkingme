import { Module, Global } from '@nestjs/common';

import {
  CreateConcertUseCase,
  ShowConcertsUseCase,
  DeleteConcertUseCase,
  MetaDataConcert,
  ShowUserConcertsUseCase,
} from '@use-case/index';

import { ConcertAdminController } from './concert.admin.controller';
import { ConcertUserController } from './concert.user.controller';

@Global()
@Module({
  imports: [],
  providers: [
    ShowConcertsUseCase,
    CreateConcertUseCase,
    DeleteConcertUseCase,
    MetaDataConcert,
    ShowUserConcertsUseCase,
  ],
  controllers: [ConcertAdminController, ConcertUserController],
  exports: [],
})
export class ConcertModule {}

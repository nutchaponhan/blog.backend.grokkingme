import { Module, Global } from '@nestjs/common';

import {
  IUserRepository,
  IConcertRepository,
  IReservationRepository,
  IReservationAuditRepository,
} from '@core/repository';

import { PrismaService } from './prisma.service';
import {
  UserRepository,
  ConcertRepository,
  ReservationRepository,
  ReservationAuditRepository,
} from './repository';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IConcertRepository,
      useClass: ConcertRepository,
    },
    {
      provide: IReservationRepository,
      useClass: ReservationRepository,
    },
    {
      provide: IReservationAuditRepository,
      useClass: ReservationAuditRepository,
    },
    PrismaService,
  ],
  exports: [
    IUserRepository,
    IConcertRepository,
    IReservationRepository,
    IReservationAuditRepository,
    PrismaService,
  ],
})
export class PrismaModule {}

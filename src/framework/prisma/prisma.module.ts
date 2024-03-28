import { Global,Module } from '@nestjs/common';

import { IUserRepository } from '@/core/repository';

import { PrismaService } from './prisma.service';
import { UserRepository } from './repository';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    PrismaService,
  ],
  exports: [IUserRepository, PrismaService],
})
export class PrismaModule {}

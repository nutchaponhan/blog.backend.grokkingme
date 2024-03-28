import { Global, Module } from '@nestjs/common';

import { IUserRepository } from '@/core/repository';

import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './repository';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, IUserRepository],
})
export class PrismaModule {}

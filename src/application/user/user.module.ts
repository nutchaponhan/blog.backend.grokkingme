import { Global, Module } from '@nestjs/common';

import { AuthModule } from '@/service/auth';
import { UserUseCase } from '@/use-case';

import { UserController } from './user.controller';

@Global()
@Module({
  imports: [AuthModule],
  providers: [UserUseCase],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}

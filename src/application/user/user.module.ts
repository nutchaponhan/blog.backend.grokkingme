import { Global, Module } from '@nestjs/common';

import { UserUseCase } from '@/use-case';

import { UserController } from './user.controller';

@Global()
@Module({
  imports: [],
  providers: [UserUseCase],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}

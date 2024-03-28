import { Body, Controller, Post } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';

import { UserEntity } from '@/core';
import { CreateUserDto } from '@/core/dto';
import { UserUseCase } from '@/use-case/user';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private userUserCase: UserUseCase) {}

  @Transactional()
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userUserCase.createNewUser(createUserDto);
  }
}

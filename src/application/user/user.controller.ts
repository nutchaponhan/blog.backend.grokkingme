import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get()
  async getUser(@Query() query: { id: string }): Promise<UserEntity> {
    const userId = parseInt(query.id);
    return await this.userUserCase.getUser(userId);
  }
}

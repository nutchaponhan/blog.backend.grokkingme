import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';
import { Request } from 'express';

import { UserEntity } from '@/core';
import { CreateUserDto, SignInUserDto } from '@/core/dto';
import { AccessTokenGuard, RefreshTokenGuard } from '@/framework';
import { UserUseCase } from '@/use-case/user';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private userUserCase: UserUseCase) {}

  @Transactional()
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.userUserCase.createNewUser(createUserDto);
  }

  @Transactional()
  @Post('/signin')
  async signInUser(@Body() signInDto: SignInUserDto): Promise<{
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.userUserCase.signIn(signInDto);
  }

  @Transactional()
  @UseGuards(AccessTokenGuard)
  @Post('/signout')
  async signOutUser(@Req() req: Request): Promise<void> {
    const userId = parseInt(req.user['sub']);
    await this.userUserCase.signOut(userId);
    return;
  }

  @Transactional()
  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refreshToken(@Req() req: Request): Promise<{ accessToken: string }> {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.userUserCase.userRefreshToken(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async getUser(@Req() req: Request): Promise<UserEntity> {
    const userId = parseInt(req.user['sub']);
    return await this.userUserCase.getUser(userId);
  }
}

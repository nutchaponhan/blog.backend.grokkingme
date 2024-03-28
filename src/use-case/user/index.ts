import { Injectable } from '@nestjs/common';

import { AppException } from '@/common';
import { UserEntity } from '@/core';
import { CreateUserDto, SignInUserDto } from '@/core/dto';
import { IUserRepository } from '@/core/repository';
import { AuthService } from '@/service';

@Injectable()
export class UserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private authService: AuthService,
  ) {}

  async createNewUser(data: CreateUserDto): Promise<{
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const newUser = await this.userRepo.create(data);

      const payload = { sub: newUser.id, email: newUser.email };

      const { accessToken, refreshToken } =
        await this.authService.createTokens(payload);

      return {
        id: newUser.id,
        email: newUser.email,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw AppException.throwErrorMessage('fail to create new user');
    }
  }

  async signIn(data: SignInUserDto): Promise<{
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const user = await this.userRepo.findByEmail(data.email, {
        id: true,
        email: true,
        password: true,
        role: true,
        profile: true,
      });

      if (!user) {
        throw AppException.throwErrorMessage('user not found');
      }

      if (data.password !== user.password) {
        throw AppException.throwErrorMessage('Please check email or password');
      }

      const payload = { sub: user.id, email: user.email };

      const { accessToken, refreshToken } =
        await this.authService.createTokens(payload);

      return {
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw AppException.throwErrorMessage(error.message);
    }
  }

  async userRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userRepo.findById(userId, {
      id: true,
      email: true,
      role: true,
      profile: true,
    });

    // TODO: check & compare refresh token

    const payload = { sub: user.id, email: user.email };

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.createTokens(payload);

    return {
      id: user.id,
      email: user.email,
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getUser(userId: number): Promise<UserEntity> {
    return await this.userRepo.findById(userId, {
      id: true,
      email: true,
      role: true,
      profile: true,
    });
  }
}

import { Injectable } from '@nestjs/common';

import { AppException } from '@/common';
import { UserEntity } from '@/core';
import { CreateUserDto, SignInUserDto } from '@/core/dto';
import { IUserRepository } from '@/core/repository';
import { AuthService } from '@/service';
import { ArgonHasher } from '@/util';

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
      const hasher = new ArgonHasher().addPassword(data.password).build();
      const passwordHashed = await hasher.hash();

      const newUser = await this.userRepo.create({
        ...data,
        password: passwordHashed,
      });

      const payload = { sub: newUser.id, email: newUser.email };

      const { accessToken, refreshToken } =
        await this.authService.createTokens(payload);

      await this.userRepo.getTx().user.update({
        where: {
          id: newUser.id,
        },
        data: {
          refreshToken,
        },
      });

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

      const hasher = new ArgonHasher()
        .addPassword(data.password)
        .addHashed(user.password)
        .build();

      if (!(await hasher.verify())) {
        throw AppException.throwErrorMessage('Please check email or password');
      }

      const payload = { sub: user.id, email: user.email };

      const { accessToken, refreshToken } =
        await this.authService.createTokens(payload);

      await this.userRepo.getTx().user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken,
        },
      });

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

  async signOut(userId: number): Promise<void> {
    const user = await this.userRepo.findById(userId, {
      id: true,
      email: true,
      role: true,
      profile: true,
    });

    await this.userRepo.getTx().user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async userRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepo.findById(userId, {
      id: true,
      email: true,
      role: true,
      profile: true,
      refreshToken: true,
    });

    if (!user || !user.refreshToken) {
      throw AppException.throwErrorMessage('Please signin first');
    }

    if (refreshToken !== user.refreshToken) {
      throw AppException.throwErrorMessage('No authorization');
    }

    const payload = { sub: user.id, email: user.email };

    const { accessToken } = await this.authService.createTokens(payload);

    return {
      accessToken,
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

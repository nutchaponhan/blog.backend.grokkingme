import { Injectable } from '@nestjs/common';

import { AppException } from '@/common';
import { UserEntity } from '@/core';
import { CreateUserDto } from '@/core/dto';
import { IUserRepository } from '@/core/repository';
import { AuthService } from '@/service';

@Injectable()
export class UserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private authService: AuthService,
  ) {}

  async createNewUser(data: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = await this.userRepo.create(data);

      const payload = { sub: newUser.id, email: newUser.email };

      const accessToken = await this.authService.createTokens(payload);

      console.log({ accessToken });

      return newUser;
    } catch (error) {
      throw AppException.cannotCreateUser('fail to create new user');
    }
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

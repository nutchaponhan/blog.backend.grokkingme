import { Injectable } from '@nestjs/common';

import { AppException } from '@/common';
import { UserEntity } from '@/core';
import { CreateUserDto } from '@/core/dto';
import { IUserRepository } from '@/core/repository';

@Injectable()
export class UserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async createNewUser(data: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userRepo.create(data);
    } catch (error) {
      throw AppException.cannotCreateUser('fail to create new user');
    }
  }
}

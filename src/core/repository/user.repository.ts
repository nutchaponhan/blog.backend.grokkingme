import { UserEntity } from '../entity';

export abstract class IUserRepository {
  abstract findById(id: number): Promise<UserEntity>;

  abstract create(user: UserEntity): Promise<UserEntity>;
}

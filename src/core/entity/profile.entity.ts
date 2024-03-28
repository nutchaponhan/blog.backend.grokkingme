import { UserEntity } from './user.entity';

export class ProfileEntity {
  id!: number;
  firstname!: string;
  lastname!: string;
  profile?: string;

  user?: UserEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

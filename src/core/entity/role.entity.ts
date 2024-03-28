import { RoleTitle } from '@prisma/client';

import { UserEntity } from './user.entity';

export class RoleEntity {
  id!: number;
  title!: RoleTitle;

  user?: UserEntity[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

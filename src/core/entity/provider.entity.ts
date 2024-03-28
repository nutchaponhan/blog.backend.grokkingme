import { ProviderType } from '@prisma/client';

import { UserEntity } from './user.entity';

export class ProviderEntity {
  id!: number;
  email!: string;

  type: ProviderType;

  user?: UserEntity;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

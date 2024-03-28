import { ProfileEntity } from './profile.entity';
import { ProviderEntity } from './provider.entity';
import { RoleEntity } from './role.entity';

export class UserEntity {
  id!: number;

  email!: string;
  password?: string;

  refreshToken?: string;

  role?: RoleEntity;
  roleId?: number;

  provider?: ProviderEntity;
  providerId?: number;

  profile?: ProfileEntity;
  profileId?: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

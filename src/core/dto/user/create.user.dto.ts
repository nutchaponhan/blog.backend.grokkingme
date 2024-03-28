import { ProviderType, RoleTitle } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEnum([ProviderType.Credentail, ProviderType.Github, ProviderType.Google])
  channel: ProviderType;

  @IsEnum([RoleTitle.Admin, RoleTitle.User])
  role?: RoleTitle;
}

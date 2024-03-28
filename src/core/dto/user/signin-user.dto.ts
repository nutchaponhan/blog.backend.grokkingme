import { IsOptional, IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}

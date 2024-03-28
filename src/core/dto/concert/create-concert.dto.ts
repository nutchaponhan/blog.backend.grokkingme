import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateConcertDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsNumber()
  seat: number;

  @Expose()
  @IsNumber()
  createdById: number;
}

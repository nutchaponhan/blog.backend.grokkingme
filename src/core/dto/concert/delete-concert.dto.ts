import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteConcertDto {
  @Expose()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}

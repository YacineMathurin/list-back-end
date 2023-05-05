import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  id: number;

  title?: string;

  description?: string;
}

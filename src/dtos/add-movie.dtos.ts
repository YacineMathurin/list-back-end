import { Blob } from 'buffer';
import { IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  thumbnail: string;
}

import { Blob } from 'buffer';
import { IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  thumbnail: string;
}

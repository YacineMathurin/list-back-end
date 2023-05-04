import { IsNotEmpty } from 'class-validator';

export class DeleteMovieDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  thumbnailPath: string;
}

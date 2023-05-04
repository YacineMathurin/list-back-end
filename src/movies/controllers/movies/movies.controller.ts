import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddMovieDto } from 'src/dtos/add-movie.dtos';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { Express, Request } from 'express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DeleteMovieDto } from 'src/dtos/delete-movie.dtos';

@Controller('movie')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // Downloading a file
  @Get('thumbnail/:filename')
  getAssetsRepo(@Param() params: { filename: string }) {
    console.log('Query', params);
    const file = createReadStream(
      join(process.cwd(), '/uploads/' + params.filename),
    );
    return new StreamableFile(file);
  }

  @Get()
  async getMovies() {
    return await this.moviesService.fetchMovies();
  }

  @Post()
  async addMovie(@Body() movie: AddMovieDto) {
    console.log('Movie received', movie);

    return await this.moviesService.addMovie(movie);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, callback) => {
          callback(null, `${file.fieldname} - ${Date.now()}.jpeg`);
        },
      }),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() rest: { title: string; description: string },
  ) {
    console.log(typeof file, file);
    const movie = {
      title: rest.title,
      description: rest.description,
      thumbnail: `${file.filename}`,
    };
    await this.moviesService.addMovie(movie);
    return { msg: `File saved` };
  }

  @Post('delete')
  async deleteMovie(@Body() deleteMovieDto: DeleteMovieDto) {
    return await this.moviesService.deleteMovie(deleteMovieDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
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

@Controller('movie')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

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
    @Body() rest: { name: string; description: string },
  ) {
    console.log(typeof file, file, typeof file.buffer);
    const movie = {
      name: rest.name,
      description: rest.description,
      thumbnail: `${file.filename}`,
    };
    await this.moviesService.addMovie(movie);
    return { msg: `File saved` };
  }
}

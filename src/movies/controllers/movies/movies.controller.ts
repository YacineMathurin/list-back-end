import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddMovieDto } from 'src/dtos/add-movie.dtos';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { Express } from 'express';

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
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() rest: { name: string; description: string },
  ) {
    console.log(typeof file, file, typeof file.buffer);
    const movie = {
      name: rest.name,
      description: rest.description,
      thumbnail: file.buffer,
    };
    console.log('Rest of vals', file, rest);

    await this.moviesService.addMovie(movie);
    return { msg: `Movie saved !` };
  }
}

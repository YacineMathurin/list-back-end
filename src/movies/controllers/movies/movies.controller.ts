import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddMovieDto } from 'src/dtos/add-movie.dtos';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DeleteMovieDto } from 'src/dtos/delete-movie.dtos';
import { UpdateMovieDto } from 'src/dtos/update-movie.dtos';

@Controller('movie')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // Downloading a file
  @Get('thumbnail/:filename')
  getAssetsRepo(@Param() params: { filename: string }) {
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
    return await this.moviesService.addMovie(movie);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
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
    const movie = {
      title: rest.title,
      description: rest.description,
      thumbnail: `${file.filename}`,
    };
    await this.moviesService.addMovie(movie);
    return { msg: `File saved` };
  }

  @Patch('update')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, callback) => {
          callback(null, `${file?.fieldname} - ${Date.now()}.jpeg`);
        },
      }),
    }),
  )
  async updateMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const movieDetails = {
      ...(file && { thumbnail: file.filename }),
      ...updateMovieDto,
    };

    try {
      return await this.moviesService.updateMovie(movieDetails);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('delete')
  async deleteMovie(@Body() deleteMovieDto: DeleteMovieDto) {
    return await this.moviesService.deleteMovie(deleteMovieDto);
  }
}

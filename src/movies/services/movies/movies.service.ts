import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Movie } from 'src/typeorm/entities/movies.entity';
import { customWinstomLogger } from 'src/utils/custom-winstom-logger';
import {
  AddMovieType,
  DeleteMovieType,
  UpdateMovieType,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  fetchMovies() {
    customWinstomLogger('Movie Fetched !', this.logger);

    return this.moviesRepository.find();
  }

  addMovie(movie: AddMovieType): Promise<Movie> {
    const newMovie = this.moviesRepository.create({
      ...movie,
      createdAt: new Date(),
    });
    return this.moviesRepository.save(newMovie);
  }

  async updateMovie(updateMovie: UpdateMovieType) {
    const { id, ...rest } = updateMovie;
    const result = await this.moviesRepository.findBy({ id: Number(id) });

    if (!result.length) {
      customWinstomLogger(
        new HttpException('Movie not found', HttpStatus.BAD_REQUEST),
        this.logger,
      );
      throw new Error('Movie not found');
    }
    return this.moviesRepository.update(id, { ...rest });
  }

  deleteMovie(data: DeleteMovieType) {
    const { id, thumbnailPath } = data;
    fs.unlink(`${process.cwd()}/uploads/${thumbnailPath}`, (err) => {
      console.error(err);
      customWinstomLogger(err, this.logger);
      if (err) throw new Error('Something went wrong when deleting file');
    });
    return this.moviesRepository.delete(id);
  }
}

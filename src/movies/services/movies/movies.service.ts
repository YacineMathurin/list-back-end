import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Movie } from 'src/typeorm/entities/movies.entity';
import { AddMovieType, DeleteMovieType } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}
  fetchMovies() {
    return this.moviesRepository.find();
  }

  addMovie(movie: AddMovieType): Promise<Movie> {
    const newMovie = this.moviesRepository.create({
      ...movie,
      createdAt: new Date(),
    });
    return this.moviesRepository.save(newMovie);
  }

  deleteMovie(data: DeleteMovieType) {
    const { id, thumbnailPath } = data;
    fs.unlink(`${process.cwd()}/uploads/${thumbnailPath}`, (err) => {
      console.error(err);
      // throw new Error('Error on deleting movie thumbnail');
    });
    return this.moviesRepository.delete(id);
  }
}

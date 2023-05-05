import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Movie } from 'src/typeorm/entities/movies.entity';
import {
  AddMovieType,
  DeleteMovieType,
  UpdateMovieType,
} from 'src/utils/types';
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

  async updateMovie(updateMovie: UpdateMovieType) {
    const { id, ...rest } = updateMovie;
    const result = await this.moviesRepository.findBy({ id: Number(id) });

    if (!result.length) {
      throw new Error('Movie not found');
    }
    try {
      return this.moviesRepository.update(id, { ...rest });
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteMovie(data: DeleteMovieType) {
    const { id, thumbnailPath } = data;
    fs.unlink(`${process.cwd()}/uploads/${thumbnailPath}`, (err) => {
      console.error(err);
      if (err) throw new Error('Something went wrong when deleting file');
    });
    return this.moviesRepository.delete(id);
  }
}

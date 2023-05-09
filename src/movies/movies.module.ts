import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MoviesController } from './controllers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/typeorm/entities/movies.entity';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { MoviesMiddleware } from './middlewares/movies/movies.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          dirname: process.cwd(),
          filename: 'logging.log',
        }),
      ],
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MoviesMiddleware).forRoutes('*');
  }
}

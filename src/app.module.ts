import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MoviesModule } from './movies/movies.module';

import { User } from './typeorm/entities/user.entity';
import { Profile } from './typeorm/entities/profile.entity';
import { Movie } from './typeorm/entities/movies.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password: 'password',
      database: 'NestDB',
      entities: [User, Profile, Movie],
      synchronize: true,
    }),
    UsersModule,
    ProfilesModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

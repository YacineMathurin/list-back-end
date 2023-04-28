import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from 'src/typeorm/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileType } from 'src/utils/types';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createProfile(id: number, profileDetails: CreateProfileType) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        "User with this id doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profilesRepository.create(profileDetails);
    const savedProfile = await this.profilesRepository.save(newProfile);
    user.profile = savedProfile;
    return await this.usersRepository.save(user);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserType, UpdateUserType } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  fetchUsers() {
    return this.usersRepository.find({ relations: ['profile'] });
  }

  createUser(user: CreateUserType): Promise<User> {
    const newUser = this.usersRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.usersRepository.save(newUser);
  }

  updateUserInfo(id: number, updatedUserDetails: UpdateUserType) {
    return this.usersRepository.update({ id }, { ...updatedUserDetails });
  }
}

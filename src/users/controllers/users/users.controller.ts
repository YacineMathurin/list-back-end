import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateUserDtos, UpdateUserDtos } from 'src/dtos/create-user.dtos';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.usersService.fetchUsers();
  }

  @Post('create')
  async createUser(@Body() createUser: CreateUserDtos) {
    const newUser = await this.usersService.createUser(createUser);
    return newUser;
  }

  @Put('update/:id')
  async updateUserDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDetails: UpdateUserDtos,
  ) {
    return await this.usersService.updateUserInfo(id, userDetails);
  }
}

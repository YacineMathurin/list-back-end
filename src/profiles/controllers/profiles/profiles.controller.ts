import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateProfileDtos } from 'src/dtos/create-profile.dtos';
import { ProfilesService } from 'src/profiles/services/profiles/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileServices: ProfilesService) {}

  @Post('create/:id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileDetails: CreateProfileDtos,
  ) {
    return this.profileServices.createProfile(id, profileDetails);
  }
}

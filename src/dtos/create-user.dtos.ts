import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDtos {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

export class UpdateUserDtos {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateProfileDtos {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  dob: string;
}

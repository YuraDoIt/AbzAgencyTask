import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

export class UserCreateDTO {
  name: string;

  @IsEmail()
  email: string;

  phone: string;

  position_id: number;

  registration_timestamp: number;

  photo: string;
}

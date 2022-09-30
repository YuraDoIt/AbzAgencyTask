import { IsEmail } from 'class-validator';

export interface UserCreateDTO {
  name: string;

  email: string;

  phone: string;

  position_id: number;

  registration_timestamp: number;

  photo: Express.Multer.File;
}

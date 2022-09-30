import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponse } from './dto/user.response';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('seed')
  async seedUsers() {
    return await this.userService.seedUsersSucess();
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async getAll(@Req() request: Request): Promise<UserResponse> {
    return await this.userService.findAllUser({ ...request.query });
  }

  // @UseGuards(AuthGuard)
  @Post('users')
  async createUser(@Body() userCreateDTO: UserCreateDTO) {
    console.log(userCreateDTO);
    return await this.userService.createUserMessage(userCreateDTO);
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async photoUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}

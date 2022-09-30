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
import { Delete, Render } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponse } from './dto/user.response';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('seed')
  async seedUsers() {
    return await this.userService.seedUsersSucess();
  }

  // @UseGuards(AuthGuard)
  @Get('users')
  async getAll(@Req() request: Request): Promise<UserResponse> {
    return await this.userService.findAllUser({ ...request.query });
  }

  @UseGuards(AuthGuard)
  @Post('users')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() userCreateDTO: UserCreateDTO,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return await this.userService.createUser(file, userCreateDTO);
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async photoUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Delete('delete')
  async deleteAllUsert() {
    return await this.userService.deleteAllUsers();
  }
}

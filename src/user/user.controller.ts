import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Args } from '@nestjs/graphql';
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

  @UseGuards(AuthGuard)
  @Post('users')
  async createUser(@Args('UserCreateDTO') userCreateDTO: UserCreateDTO) {
    return await this.userService.createUserMessage(userCreateDTO);
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  // @Get('/token')
  // @UseGuards(AuthGuard)
  // async generateToken(): Promise<{
  //   success: boolean;
  //   token: any;
  // }> {
  //   return await this.userService.tokenGenerate();
  // }
}

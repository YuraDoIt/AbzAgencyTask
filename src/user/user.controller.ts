import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { AuthGuard } from '../guards/auth.guard';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAll() {
    return await this.userService.findAllUser();
  }

  @Get('seed')
  async seedUsers() {
    return await this.userService.seedUsersSucess();
  }

  @Post('user')
  async createUser(@Args('UserCreateDTO') userCreateDTO: UserCreateDTO) {
    return await this.userService.createUserMessage(userCreateDTO);
  }

  @Get('/token')
  @UseGuards(AuthGuard)
  async generateToken(): Promise<{
    success: boolean;
    token: any;
  }> {
    return await this.userService.tokenGenerate();
  }
}

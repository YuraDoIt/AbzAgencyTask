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
import { Render } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { TokenService } from '../token/token.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('api/v1')
export class UserPageController {
  constructor(private readonly userService: UserService) {}

  @Get('/seed')
  @Render('seedUser.ejs')
  async seedUsers() {
    let user = await this.userService.seedUsersSucess();
    return {
      quotation: user.data,
    };
    return await this.userService.seedUsersSucess();
  }

  @Get('/table')
  @Render('userTable.ejs')
  async renderTable(@Req() request: Request) {
    let user = await this.userService.findAllUser({ ...request.query });
    return {
      prevPage: user.links.prev_url,
      pageNext: user.links.next_url,
      total_pages: user.total_pages,
      total_users: user.total_users,
      quotation: user.users,
      current: user.page,
      pages: user.total_pages,
      count: user.count,
    };
  }

  @Get('/create')
  @Render('createUser.ejs')
  async createUserHtml() {}

  // @UseGuards(AuthGuard)
  @Post('/users')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() userCreateDTO: UserCreateDTO,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return await this.userService.createUser(file, userCreateDTO);
  }

  // @Get('users/:id')
  // @Render('userById.ejs')
  // async getUserById(@Param('id') id: number) {
  //   let userResult = await this.userService.getUserById(id);
  //   return {
  //     name: userResult.user.name,
  //     email: userResult.user.email,
  //     phone: userResult.user.phone,
  //     photo: userResult.user.photo,
  //   };
  // }

  @Get('*')
  @Render('page404.ejs')
  async render404(@Req() request: Request) {}
}

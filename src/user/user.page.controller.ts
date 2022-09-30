import { Controller, Get, Req } from '@nestjs/common';
import { Render } from '@nestjs/common/decorators';
import { Request } from 'express';
import { TokenService } from '../token/token.service';
import { UserService } from './user.service';

@Controller()
export class UserPageController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('table')
  @Render('indextable.ejs')
  async renderTable(@Req() request: Request) {
    let user = await this.userService.findAllUser({ ...request.query });
    return {
      prevPage: user.links.prev_url,
      pageNext: user.links.next_url,
      total_pages: user.total_pages,
      total_users: user.total_users,
      quotation: user.users,
    };
  }

  @Get('/create')
  @Render('createUser.ejs')
  async createUserHtml() {}

  @Get('*')
  @Render('page404.ejs')
  async render404(@Req() request: Request) {}
}

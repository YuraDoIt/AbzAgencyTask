import { Controller, Get, Post, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('')
  @Render('index.ejs')
  renderMainPage() {
    return {
      message: "hello"
    }
  }

  @Get('name')
  @Render('index.ejs')
  renderName() {
    return {
      message: "name"
    }
  }
}

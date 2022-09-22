import { Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  // getHello(Req:Request, Res:Response) {
  //   return Res.send('sldkfj')
  // }

}

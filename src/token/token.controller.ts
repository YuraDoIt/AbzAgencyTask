import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule/dist';
import { TokenResponse } from 'src/token/dto/token.response';
import { TokenService } from 'src/token/token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('api/v1/token')
  @Render('token.ejs')
  async generateTokenPage() {
    let token = await this.tokenService.tokenGenerate();
    return {
      status: token.success,
      token: token.token,
    };
  }

  @Get('/token')
  async generateToken(): Promise<TokenResponse> {
    return await this.tokenService.tokenGenerate();
  }

  @Cron('*/45 * * * *')
  async clearToken() {
    return await this.tokenService.clearToken();
  }
}

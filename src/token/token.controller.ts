import { Controller, Get, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule/dist';
import { AuthGuard } from '../guards/auth.guard';
import { TokenResponse } from './dto/token.response';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/token')
  async generateToken(): Promise<TokenResponse> {
    return await this.tokenService.tokenGenerate();
  }

  @Cron('*/45 * * * *')
  async clearToken() {
    return await this.tokenService.clearToken();
  }
}

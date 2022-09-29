import { Controller, Get, Post } from '@nestjs/common';
import { PositionService } from './position.service';

@Controller()
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('positions')
  async getPosition() {
    return await this.positionService.getPosition();
  }

  @Post('positions')
  async createPosition() {
    return await this.positionService.createSeedPosition();
  }
}

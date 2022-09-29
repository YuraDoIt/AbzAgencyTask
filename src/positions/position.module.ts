import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from './entity/position.entity';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  providers: [PositionService],
  controllers: [PositionController],
  exports: [PositionService],
})
export class PositionModule {}

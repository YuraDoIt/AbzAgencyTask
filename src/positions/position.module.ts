import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/positions/entity/position.entity';
import { PositionController } from 'src/positions/position.controller';
import { PositionService } from 'src/positions/position.service';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  providers: [PositionService],
  controllers: [PositionController],
  exports: [PositionService],
})
export class PositionModule {}

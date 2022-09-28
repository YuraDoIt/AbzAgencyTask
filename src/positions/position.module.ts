import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from './entity/position.entity';
import { PositionResolver } from './position.resolver';
import { PositionService } from './position.service';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  providers: [PositionResolver, PositionService],
})
export class UserModule {}

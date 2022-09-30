import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from '../photo/cloudinary.service';
import { PositionEntity } from '../positions/entity/position.entity';
import { PositionModule } from '../positions/position.module';
import { PositionService } from '../positions/position.service';
import { TokenEntity } from '../token/entity/token.entity';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserPageController } from './user.page.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity, PositionEntity]),
    TokenModule,
    PositionModule,
  ],
  providers: [
    UserResolver,
    UserService,
    JwtService,
    TokenService,
    PositionService,
    CloudinaryService,
  ],
  controllers: [UserController, UserPageController],
  exports: [UserService],
})
export class UserModule {}

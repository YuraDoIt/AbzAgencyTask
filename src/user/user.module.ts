import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/photo/cloudinary.service';
import { PositionEntity } from 'src/positions/entity/position.entity';
import { PositionModule } from 'src/positions/position.module';
import { PositionService } from 'src/positions/position.service';
import { TokenEntity } from 'src/token/entity/token.entity';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserPageController } from 'src/user/user.page.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity, PositionEntity]),
    TokenModule,
    PositionModule,
  ],
  providers: [
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

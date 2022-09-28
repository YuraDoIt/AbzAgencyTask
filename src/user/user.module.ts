import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '../token/entity/token.entity';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity]), TokenModule],
  providers: [UserResolver, UserService, JwtService, TokenService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

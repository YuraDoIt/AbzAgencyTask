import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'topsecret',
      signOptions: {
        expiresIn: 60 * 40,
      },
    }),
  ],
  providers: [UserResolver, UserService],
  controllers: [UserController],
})
export class UserModule {}

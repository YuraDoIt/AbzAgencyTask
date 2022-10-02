import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/token/entity/token.entity';
import { TokenController } from 'src/token/token.controller';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.register({
      secret: 'topsecret',
      signOptions: {
        expiresIn: 60 * 40,
      },
    }),
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './entity/token.entity';
import { isJwtExpired } from 'jwt-check-expiration';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity) private tokenRepo: Repository<TokenEntity>,
    private jwtService: JwtService,
  ) {}

  async tokenGenerate(): Promise<{
    success: boolean;
    token: any;
  }> {
    let token = await this.jwtService.signAsync({}, { expiresIn: '40m' });
    console.log(token);

    await this.tokenRepo.insert({ token: token });

    console.log(await this.tokenRepo.find());

    if (token) {
      return { success: true, token: token };
    }
  }

  async clearToken() {
    let tokens: TokenEntity[] = await this.tokenRepo.find();
    for (let i = 0; i < tokens.length; i++) {
      if (isJwtExpired(tokens[i].token) === true) {
        this.tokenRepo.delete({ id: i });
      }
    }
  }
}

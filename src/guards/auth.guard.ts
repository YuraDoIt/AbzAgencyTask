import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { isJwtExpired } from 'jwt-check-expiration';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException(
        { success: false, message: 'Access token is empty' },
        HttpStatus.FORBIDDEN,
      );
    }

    const token = request.headers.authorization.toString().split(' ')[1];

    if (isJwtExpired(token) === true) {
      throw new HttpException(
        { success: false, message: 'The token expired.' },
        HttpStatus.FORBIDDEN,
      );
    }

    let jwtRegExp = new RegExp(
      /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/,
    );

    if (!jwtRegExp.test(token)) {
      throw new HttpException(
        { success: false, message: 'Jwt token not valid' },
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}

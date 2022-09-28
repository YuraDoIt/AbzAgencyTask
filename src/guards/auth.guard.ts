import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
      throw new Error('Access token is empty');
    }

    const token = request.headers.authorization.toString().split(' ')[1];

    if (isJwtExpired(token) === true) {
      return false;
    }

    return true;
  }
}

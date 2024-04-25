/* eslint-disable */
import { ExtractJwt, Strategy } from 'passport-jwt';
//import { AuthService } from './jwtServise';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

export interface JwtPayload {
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  authService: any;
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

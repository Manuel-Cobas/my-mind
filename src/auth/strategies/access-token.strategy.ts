import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import type { CustomRequest } from 'types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access_secret',
      passReqToCallback: true,
    });
  }

  async validate(req: CustomRequest) {
    try {
      const accessToken = req.cookies['access_token'];
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        ignoreExpiration: true,
      });

      if (!decoded) throw new UnauthorizedException();

      return decoded;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

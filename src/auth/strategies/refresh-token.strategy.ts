import { Request } from 'express';

import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        ignoreExpiration: true,
      });

      if (!decoded) throw new UnauthorizedException();

      return decoded;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

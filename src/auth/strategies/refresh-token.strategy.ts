import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import type { CustomRequest } from 'types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req: CustomRequest) {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        ignoreExpiration: true,
      });

      return decoded;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

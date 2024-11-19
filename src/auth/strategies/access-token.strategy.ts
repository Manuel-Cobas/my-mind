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
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
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

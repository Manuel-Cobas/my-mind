import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { refreshTokenExtractor } from '../jwt-extractors/refresh-token.extractor';

import type { CustomRequest } from 'types';
import { JwtPayloadDto } from '../dto/jwt-token.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([refreshTokenExtractor]),
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req: CustomRequest, payload: JwtPayloadDto) {
    try {
      const currentUser = req.session.user;

      if (currentUser.userId !== payload.userId) {
        throw new UnauthorizedException();
      }

      return { userId: payload.userId, email: payload.email };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

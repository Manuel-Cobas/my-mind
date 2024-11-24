import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { jwtCookieExtractor } from '../jwt-extractors/jwt-cookie.extractor';

import { JwtPayloadDto } from '../dto/jwt-token.dto';
import type { CustomRequest } from 'types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtCookieExtractor]),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: 'refresh_secret',
    });
  }

  async validate(req: CustomRequest, payload: JwtPayloadDto) {
    /* comparar el payload con el usuario actual */
    const currentUser = req.session.user;
    if (currentUser.sub !== payload.sub) {
      throw new UnauthorizedException();
    }
    /* verificar si el token caduco */
    const refreshToken = req.session.refreshToken;
    const check = await this.jwtService.verifyAsync(refreshToken, {
      secret: 'refresh_secret',
      ignoreExpiration: true,
    });
    console.log('check', check, payload);
    if (check) {
      return { userId: currentUser.sub, email: currentUser.email };
    }
    console.log('renovando session');
    /* Generando tokens cuando la session caduque */
    const tokens = await this.authService.generateTokens(payload);

    req.res.cookie('access_token', tokens.accessToken);

    req.session.user = payload;
    req.session.refreshToken = tokens.refreshToken;

    return { userId: payload.sub, email: payload.email };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { refreshTokenExtractor } from '../jwt-extractors/refresh-token.extractor';

import { RefreshTokenDto } from '../dto/refresh-token.dto';
import type { CustomRequest } from 'types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([refreshTokenExtractor]),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: 'refresh_secret',
    });
  }

  async validate(req: CustomRequest, payload: RefreshTokenDto) {
    try {
      /* comparar el payload con el usuario actual */
      const currentUser = req.session.user;
      const currentTime = Date.now() / 1000;

      if (currentUser.sub !== payload.sub) {
        throw new UnauthorizedException();
      }
      /* verificar si la session caduco */
      if (payload.exp > currentTime) {
        return { userId: currentUser.sub, email: currentUser.email };
      }
      /* Generando tokens cuando la session caduque */
      const tokens = await this.authService.generateTokens({
        sub: payload.sub,
        email: payload.email,
      });

      req.res.cookie('access_token', tokens.accessToken);

      req.session.user = payload;
      req.session.refreshToken = tokens.refreshToken;

      return { userId: payload.sub, email: payload.email };
    } catch (error) {
      console.log('>>> ERROR: ', error);
      /* 
        puede que mas adelante hagamos una redireccion
        a la pagina de login directamente y con un popup
        le digamos que inicie session nuevamente
      */
      throw new UnauthorizedException();
    }
  }
}

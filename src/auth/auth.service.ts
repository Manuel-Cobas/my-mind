import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(jwtPayload: JwtPayloadDto) {
    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: 'refresh_secret',
      expiresIn: '10s',
    });

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: 'access_secret',
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }

  generateAccessToken() {
    return `This action returns all auth`;
  }

  revokeRefreshToken(id: number) {
    return `This action returns a #${id} auth`;
  }
}

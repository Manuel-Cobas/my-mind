import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import type { Response } from 'express';
import type { CustomRequest } from 'types';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(RefreshTokenGuard)
  @Get('test')
  test() {
    return 'hello user :D';
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    /** Esta funcion solo se limita a registrar al usuario */
    try {
      const userExists = await this.usersService.findBy(createUserDto.email);
      // console.log('userExists', userExists);
      if (userExists) throw new BadRequestException();

      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  async login(
    @Req()
    req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() loginUserDto: CreateUserDto,
  ) {
    try {
      const user = await this.usersService.findBy(loginUserDto.email);
      if (!user) throw new UnauthorizedException();

      if (loginUserDto.password !== user.password)
        throw new UnauthorizedException();

      const tokens = await this.authService.generateTokens({
        sub: user.id,
        email: user.email,
      });

      req.session.refreshToken = tokens.refreshToken;
      req.session.user = { sub: user.id, email: user.email };

      res.cookie('access_token', tokens.accessToken, {
        secure: false,
        httpOnly: false,
        sameSite: 'lax',
      });

      return { access_token: tokens.accessToken };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

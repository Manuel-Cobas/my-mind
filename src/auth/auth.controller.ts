import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
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

  @Post()
  async login(@Res() res: Response, @Body() loginUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.findBy(loginUserDto.email);
      if (!user) throw new UnauthorizedException();

      if (loginUserDto.password !== user.password)
        throw new UnauthorizedException();

      const jwtPayload = {
        userId: user.id,
        email: user.email,
      };

      const tokens = await this.authService.generateTokens(jwtPayload);

      /* 
        Isbo si el pana quiere gestionar los tokens 
        en el cliente a su preferencia o se le ocurre una mejor idea
        para almacenar los tokens lo que haremos es quitar la declaracion 
        de cookies del codigo y retornar directamente como respuesta 
        la constante "tokens". Por ahora hacemos la delcaracion de las 
        cookies aqui para guardar los tokens y que en redis se almacene 
        la data decodificada.
      */
     
      res.cookie('refresh_token', tokens.refreshToken, {
        secure: false,
        httpOnly: false,
        sameSite: 'lax',
      });

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

  // @Get()
  // async tokensTest() {
  //   return await this.authService.generateTokens({
  //     userId: 'asafasdf',
  //     email: 'mc@mc.com',
  //   });
  // }
}

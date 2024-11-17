import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [...usersProviders, UsersService, AuthService],
})
export class AuthModule {}

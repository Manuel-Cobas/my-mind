import { IsEmail, IsString, IsUUID } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  @IsUUID()
  sub: string;

  @IsEmail()
  email: string;
}


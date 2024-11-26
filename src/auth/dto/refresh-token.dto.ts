import { IsEmail, IsNumber, IsString, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsUUID()
  sub: string;

  @IsEmail()
  email: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}

/** Notas para payload
 * falta ubicacion del user
 */

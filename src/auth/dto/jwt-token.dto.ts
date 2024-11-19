import { IsEmail, IsString, IsUUID } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  // @IsUUID()
  userId: string;

  @IsEmail()
  email: string;
}

/** Notas para payload
 * falta ubicacion del user
 */

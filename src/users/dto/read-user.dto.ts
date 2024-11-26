import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReadUserDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  // @IsAlphanumeric()
  password: string;
}

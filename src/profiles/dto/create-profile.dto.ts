import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(12)
  last_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(12)
  nick: string;

  @IsString()
  @IsOptional()
  avatar: string;
}

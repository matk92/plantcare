import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyTwoFactorDto {
  @ApiProperty({ example: 'jaimelesplantes@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'code à 6 chiffres dans la console' })
  @IsString()
  @Length(6, 6)
  code: string;
}
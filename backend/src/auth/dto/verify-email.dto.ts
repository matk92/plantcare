import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ example: 'coller le token recu voir dans la console' })
  @IsString()
  token: string;
}
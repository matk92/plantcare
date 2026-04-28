import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'jaimelesplantes@mail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Iloveplants1234' })
  password: string;
}
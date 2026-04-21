import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jaimelesplantes@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Iloveplants1234' })
  @IsString()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'jaimelesplantes@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Iloveplants1234' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: false, example: 'Kiffeur DePLantes' })
  @IsOptional()
  @IsString()
  name?: string;
}
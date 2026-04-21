import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGardenEntryDto {
  @ApiPropertyOptional({ example: 'Mon ficus du salon' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  customName?: string;

  @ApiPropertyOptional({ example: 'Fifi' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nickname?: string;

  @ApiPropertyOptional({ example: '2026-04-21T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  lastWateredAt?: string;

  @ApiPropertyOptional({ example: 'Bonne sante' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  healthStatus?: string;

  @ApiPropertyOptional({ example: 'Arroser tous les 3 jours' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}

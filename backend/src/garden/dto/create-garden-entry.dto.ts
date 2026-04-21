import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGardenEntryDto {
  @ApiPropertyOptional({ example: 'id-de-la-plante' })
  @IsOptional()
  @IsString()
  plantId?: string;

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

  @ApiPropertyOptional({ example: '2026-04-18T19:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  lastWateredAt?: string;

  @ApiPropertyOptional({ example: 'En forme ' })
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

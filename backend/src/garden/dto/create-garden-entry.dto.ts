import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGardenEntryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  customName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nickname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastWateredAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  healthStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}

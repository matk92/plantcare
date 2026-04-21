import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  exposition?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soilHumidity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hardiness?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soilPh?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soilTexture?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  organicMatter?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drainageCapacity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  limestoneTolerance?: string;
}

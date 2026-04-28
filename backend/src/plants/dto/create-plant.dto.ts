import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty({ example: 'Morgan Treeman' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'https://i.redd.it/x6odx0ctlqx91.jpg' })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  exposition?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  soilHumidity?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  hardiness?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  soilPh?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  soilTexture?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  organicMatter?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  drainageCapacity?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  limestoneTolerance?: string;
}
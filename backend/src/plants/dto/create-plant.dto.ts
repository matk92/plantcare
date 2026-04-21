import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty({ example: 'Morgan Treeman' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiPropertyOptional({ example: 'https://i.redd.it/x6odx0ctlqx91.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'Mi-ombre' })
  @IsOptional()
  @IsString()
  exposition?: string;

  @ApiPropertyOptional({ example: 'Sol frais' })
  @IsOptional()
  @IsString()
  soilHumidity?: string;

  @ApiPropertyOptional({ example: 'Non rustique (>10°C)' })
  @IsOptional()
  @IsString()
  hardiness?: string;

  @ApiPropertyOptional({ example: 'Neutre (6.5-7.5)' })
  @IsOptional()
  @IsString()
  soilPh?: string;

  @ApiPropertyOptional({ example: 'Terreau riche' })
  @IsOptional()
  @IsString()
  soilTexture?: string;

  @ApiPropertyOptional({ example: 'Riche en humus' })
  @IsOptional()
  @IsString()
  organicMatter?: string;

  @ApiPropertyOptional({ example: 'Bon drainage' })
  @IsOptional()
  @IsString()
  drainageCapacity?: string;

  @ApiPropertyOptional({ example: 'Faible' })
  @IsOptional()
  @IsString()
  limestoneTolerance?: string;
}

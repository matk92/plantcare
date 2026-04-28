import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GardenService } from './garden.service';
import { CreateGardenEntryDto } from './dto/create-garden-entry.dto';
import { UpdateGardenEntryDto } from './dto/update-garden-entry.dto';
import type { Request } from 'express';

@ApiTags('garden')
@Controller('garden')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GardenController {
  constructor(private gardenService: GardenService) {}

  @Get()
  @ApiOperation({ summary: 'Liste mes plantes du jardin' })
  findAll(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.gardenService.findAllForUser(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: "Detail d'une plante de mon jardin" })
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { id: string };
    return this.gardenService.findOneForUser(user.id, id);
  }

  @Post()
  @ApiOperation({ summary: 'Ajouter une plante dans mon jardin' })
  create(@Req() req: Request, @Body() dto: CreateGardenEntryDto) {
    const user = req.user as { id: string };
    return this.gardenService.create(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre a jour (arrosage, etat, etc.)' })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateGardenEntryDto,
  ) {
    const user = req.user as { id: string };
    return this.gardenService.update(user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Retirer une plante de mon jardin' })
  remove(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { id: string };
    return this.gardenService.remove(user.id, id);
  }
}
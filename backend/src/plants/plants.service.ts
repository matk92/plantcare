import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.plant.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const plant = await this.prisma.plant.findUnique({ where: { id } });
    if (!plant) throw new NotFoundException('Plante introuvable');
    return plant;
  }

  create(dto: CreatePlantDto) {
    return this.prisma.plant.create({ data: dto });
  }

  update(id: string, dto: UpdatePlantDto) {
    return this.prisma.plant.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.plant.delete({ where: { id } });
    return { message: 'Plante supprimee' };
  }
}
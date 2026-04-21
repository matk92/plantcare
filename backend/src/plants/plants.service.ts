import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.plant.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const plant = await this.prisma.plant.findUnique({ where: { id } });
    if (!plant) {
      throw new NotFoundException('Plante introuvable');
    }
    return plant;
  }

  create(dto: CreatePlantDto) {
    return this.prisma.plant.create({ data: dto });
  }

  async update(id: string, dto: UpdatePlantDto) {
    await this.findOne(id);
    return this.prisma.plant.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.plant.delete({ where: { id } });
    return { message: 'Plante supprimée' };
  }
}

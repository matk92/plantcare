import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGardenEntryDto } from './dto/create-garden-entry.dto';
import { UpdateGardenEntryDto } from './dto/update-garden-entry.dto';

@Injectable()
export class GardenService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForUser(userId: string) {
    return this.prisma.gardenEntry.findMany({
      where: { userId },
      include: { plant: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForUser(userId: string, id: string) {
    const entry = await this.prisma.gardenEntry.findUnique({
      where: { id },
      include: { plant: true },
    });
    if (!entry || entry.userId !== userId) {
      throw new NotFoundException('Plante du jardin introuvable');
    }
    return entry;
  }

  async create(userId: string, dto: CreateGardenEntryDto) {
    if (!dto.plantId && !dto.customName) {
      throw new BadRequestException('Il faut un plantId ou un customName');
    }

    if (dto.plantId) {
      const plant = await this.prisma.plant.findUnique({
        where: { id: dto.plantId },
      });
      if (!plant) {
        throw new BadRequestException('Plante introuvable');
      }
    }

    return this.prisma.gardenEntry.create({
      data: {
        userId,
        plantId: dto.plantId,
        customName: dto.customName,
        nickname: dto.nickname,
        lastWateredAt: dto.lastWateredAt ? new Date(dto.lastWateredAt) : undefined,
        healthStatus: dto.healthStatus,
        notes: dto.notes,
      },
      include: { plant: true },
    });
  }

  async update(userId: string, id: string, dto: UpdateGardenEntryDto) {
    await this.findOneForUser(userId, id);

    return this.prisma.gardenEntry.update({
      where: { id },
      data: {
        plantId: dto.plantId,
        customName: dto.customName,
        nickname: dto.nickname,
        lastWateredAt: dto.lastWateredAt ? new Date(dto.lastWateredAt) : undefined,
        healthStatus: dto.healthStatus,
        notes: dto.notes,
      },
      include: { plant: true },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOneForUser(userId, id);
    await this.prisma.gardenEntry.delete({ where: { id } });
    return { message: 'Plante retiré du jardin' };
  }
}

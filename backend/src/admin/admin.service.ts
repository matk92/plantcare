import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  listGardens() {
    return this.prisma.gardenEntry.findMany({
      include: {
        plant: true,
        user: { select: { id: true, email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

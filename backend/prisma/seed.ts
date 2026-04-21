import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '../generated/prisma/client';

interface PlantRecord {
  name: string;
  image_url?: string;
  exposition?: string;
  soil_humidity?: string;
  hardiness?: string;
  soil_ph?: string;
  soil_texture?: string;
  organic_matter?: string;
  drainage_capacity?: string;
  limestone_tolerance?: string;
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const filePath = join(__dirname, 'plants.json');
  const raw = readFileSync(filePath, 'utf-8');
  const plants = JSON.parse(raw) as PlantRecord[];

  console.log(`Seeding ${plants.length} plants...`);

  for (const plant of plants) {
    await prisma.plant.upsert({
      where: { name: plant.name },
      update: {
        imageUrl: plant.image_url,
        exposition: plant.exposition,
        soilHumidity: plant.soil_humidity,
        hardiness: plant.hardiness,
        soilPh: plant.soil_ph,
        soilTexture: plant.soil_texture,
        organicMatter: plant.organic_matter,
        drainageCapacity: plant.drainage_capacity,
        limestoneTolerance: plant.limestone_tolerance,
      },
      create: {
        name: plant.name,
        imageUrl: plant.image_url,
        exposition: plant.exposition,
        soilHumidity: plant.soil_humidity,
        hardiness: plant.hardiness,
        soilPh: plant.soil_ph,
        soilTexture: plant.soil_texture,
        organicMatter: plant.organic_matter,
        drainageCapacity: plant.drainage_capacity,
        limestoneTolerance: plant.limestone_tolerance,
      },
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

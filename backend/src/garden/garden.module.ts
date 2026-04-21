import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GardenController } from './garden.controller';
import { GardenService } from './garden.service';

@Module({
  imports: [AuthModule],
  controllers: [GardenController],
  providers: [GardenService],
})
export class GardenModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

@Module({
  imports: [AuthModule],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}

import { Module } from '@nestjs/common';
import { VehiclesModule } from '../vehiclesModule/vehiclesModule.module';

@Module({
  imports: [VehiclesModule],
})
export class CommomModule {}

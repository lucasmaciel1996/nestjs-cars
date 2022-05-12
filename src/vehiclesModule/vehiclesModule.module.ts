import { Module } from '@nestjs/common';
import { BrandModule } from './brand/branc.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [CarsModule, BrandModule],
})
export class VehiclesModule {}

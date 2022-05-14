import { Module } from '@nestjs/common';
import { CompaniesCarsModule } from './companies-cars/companies-cars.module';

@Module({
  imports: [CompaniesCarsModule],
})
export class ProductsModule {}

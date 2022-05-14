import { Module } from '@nestjs/common';
import { CompaniesCarsController } from './companies-cars.controller';
import { CompaniesCarsService } from './companies-cars.service';

@Module({
  controllers: [CompaniesCarsController],
  providers: [CompaniesCarsService],
})
export class CompaniesCarsModule {}

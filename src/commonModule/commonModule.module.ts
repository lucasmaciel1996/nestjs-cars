import { Module } from '@nestjs/common';
import { CompaniesModule } from './companiesModule/companies.module';

@Module({
  imports: [CompaniesModule],
})
export class CommonModule {}

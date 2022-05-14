import { Controller, Get, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  index() {
    return this.companiesService.index();
  }

  @Post()
  index1() {
    return 'ID' + 1;
  }
}

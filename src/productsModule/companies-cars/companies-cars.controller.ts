import { Controller, Get } from '@nestjs/common';
import { CompaniesCarsService } from './companies-cars.service';

@Controller()
export class CompaniesCarsController {
  constructor(private readonly companiesCarService: CompaniesCarsService) {}

  @Get()
  index() {
    return this.companiesCarService.getAll();
  }
}

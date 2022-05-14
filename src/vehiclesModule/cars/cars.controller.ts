import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  index() {
    return this.carsService.index();
  }

  @Get(':id')
  findOne(@Param() { id }: { id: string }) {
    return this.carsService.findOne(id);
  }
}

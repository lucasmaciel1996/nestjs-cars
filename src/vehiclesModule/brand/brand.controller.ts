import { Controller, Get } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('')
  index() {
    return this.brandService.getAll();
  }

  @Get('count')
  brandUsed() {
    return this.brandService.getBrandUsedAndCount();
  }
}

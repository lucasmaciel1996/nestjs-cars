import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandRepository } from './repositories/brand.repository';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandRepository)
    private readonly brandRepository: BrandRepository,
  ) {}

  getAll() {
    return this.brandRepository.getAll();
  }

  getBrandUsedAndCount() {
    return this.brandRepository.countBrandUsed();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingService } from '../../../libs/logging/src';
import { CarsRepository } from './repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository)
    private readonly carsRepository: CarsRepository,
  ) {}
  index() {
    return this.carsRepository.getAll();
  }

  async findOne(id: string) {
    const car = await this.carsRepository.getById(id);

    if (!car) throw new NotFoundException('Car not found!!');

    return car;
  }
}

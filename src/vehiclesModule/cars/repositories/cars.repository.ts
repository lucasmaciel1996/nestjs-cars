import { EntityRepository, Repository } from 'typeorm';
import { Cars } from '../entities/cars.entity';

@EntityRepository(Cars)
export class CarsRepository extends Repository<Cars> {
  getAll() {
    return this.find({
      select: ['id', 'name', 'plate'],
      order: { name: 'ASC' },
    });
  }
  getById(id: string) {
    return this.findOne(id);
  }
}

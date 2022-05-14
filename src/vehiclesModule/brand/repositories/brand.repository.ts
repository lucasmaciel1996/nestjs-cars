import { EntityRepository, Repository } from 'typeorm';
import { Brand } from '../entities/brancd.entity';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
  getAll() {
    return this.find();
  }

  countBrandUsed() {
    return this.query(`
      select 
       b.slug, 
       count(1) 
      from vehicle.cars c 
      join vehicle.brand b on b.id = c.brand_id 
      group by 1
    `);
  }
}

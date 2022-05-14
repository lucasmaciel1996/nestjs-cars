import { Factory, Seeder } from 'typeorm-seeding';
import { Companies } from '../../businessUnitModule/companies/entities/companies.entity';

export default class CreateCompaniesSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Companies)().createMany(10);
  }
}

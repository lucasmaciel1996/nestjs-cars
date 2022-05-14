import { define } from 'typeorm-seeding';
import { Companies } from '../../businessUnitModule/companies/entities/companies.entity';
import { faker } from '@faker-js/faker';

define(Companies, () => {
  const company = new Companies();

  company.idLegacy = faker.datatype.uuid();
  company.name = faker.company.companyName();
  company.isActive = true;
  company.score = faker.datatype.number({ max: 1000 });

  return company;
});

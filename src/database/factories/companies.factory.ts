import { define } from 'typeorm-seeding';
import { Companies } from '../../commonModule/companiesModule/entities/companies.entity';
import { faker } from '@faker-js/faker';

define(Companies, () => {
  const company = new Companies();

  company.idLegacy = faker.datatype.uuid();
  company.name = faker.company.companyName();
  company.isActive = true;

  return company;
});

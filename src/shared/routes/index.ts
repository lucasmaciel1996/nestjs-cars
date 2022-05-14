import { Routes } from '@nestjs/core';
import { BusinessUnitModule } from '../../businessUnitModule/businessUnitModule.module';
import { CompaniesModule } from '../../businessUnitModule/companies/companies.module';
import { CommomModule } from '../../commomModule/commomModule.module';
import { CompaniesCarsModule } from '../../productsModule/companies-cars/companies-cars.module';
import { ReservationsModule } from '../../businessUnitServiceModule/reservations/reservations.module';
import { BrandModule } from '../../vehiclesModule/brand/branc.module';
import { CarsModule } from '../../vehiclesModule/cars/cars.module';
import { ProductsModule } from '../../productsModule/productsModule.module';
import { BusinessUnitServiceModule } from '../../businessUnitServiceModule/businessUnitServiceModule.module';

const businessUnitRoutes: Routes = [
  {
    path: 'business-unit',
    module: BusinessUnitModule,
    children: [{ path: 'companies', module: CompaniesModule }],
  },
];

const productsRoutes: Routes = [
  {
    path: 'products',
    module: ProductsModule,
    children: [{ path: 'cars', module: CompaniesCarsModule }],
  },
];

const productsServiceRoutes: Routes = [
  {
    path: 'products-service',
    module: BusinessUnitServiceModule,
    children: [{ path: 'reservations', module: ReservationsModule }],
  },
];

const adminRoutes: Routes = [
  {
    path: 'admin',
    module: CommomModule,
    children: [
      { path: 'brand', module: BrandModule },
      { path: 'cars', module: CarsModule },
    ],
  },
];

const routes: Routes = [
  ...businessUnitRoutes,
  ...productsRoutes,
  ...productsServiceRoutes,
  ...adminRoutes,
];

export { routes };

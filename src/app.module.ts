import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configDatabase from './database/config';
import { HealthModule } from './healthModule/health.module';
import { BusinessUnitModule } from './businessUnitModule/businessUnitModule.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './shared/routes';
import { BusinessUnitServiceModule } from './businessUnitServiceModule/businessUnitServiceModule.module';
import { ProductsModule } from './productsModule/productsModule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configDatabase],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    RouterModule.register(routes),
    HealthModule,
    BusinessUnitModule,
    BusinessUnitServiceModule,
    ProductsModule,
  ],
})
export class AppModule {}

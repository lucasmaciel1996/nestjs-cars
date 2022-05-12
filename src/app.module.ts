import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './commonModule/commonModule.module';
import configDatabase from './database/config';
import { HealthModule } from './healthModule/health.module';
import { VehiclesModule } from './vehiclesModule/vehiclesModule.module';

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
    HealthModule,
    VehiclesModule,
    CommonModule,
  ],
})
export class AppModule {}

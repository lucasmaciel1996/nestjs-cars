import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { resolve } from 'path';

const configDatabase: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: ['query'],
  entities: [resolve(__dirname, '..', '..', '**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, '..', 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
  extra: {
    max: process.env.POSTGRES_MAX_CONNECTION || 20,
  },
};

export default registerAs('database', () => configDatabase);

export { configDatabase };

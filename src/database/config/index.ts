import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { resolve } from 'path';

const configDatabase: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'wtp',
  logging: ['query'],
  entities: [resolve(__dirname, '..', '..', '**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, '..', 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
  extra: {
    max: 20,
  },
};

export default registerAs('database', () => configDatabase);

export { configDatabase };

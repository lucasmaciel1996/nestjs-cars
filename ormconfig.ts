import { configDatabase } from './src/database/config';

export default {
  ...configDatabase,
  seeds: ['src/**/*.seed{.ts,.js}'],
  factories: ['src/**/*.factory{.ts,.js}'],
};

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfigSchema1652197314487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createSchema('vehicles', true);
    await queryRunner.createSchema('companies', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('vehicles', true, true);
    await queryRunner.dropSchema('companies', true, true);
  }
}

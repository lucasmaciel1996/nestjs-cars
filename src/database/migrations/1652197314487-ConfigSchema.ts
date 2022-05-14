import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfigSchema1652197314487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createSchema('business_unit', true);
    await queryRunner.createSchema('vehicle', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('business_unit', true, true);
    await queryRunner.dropSchema('vehicle', true, true);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfigSchemaSchedule1652451999092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('product', true);
    await queryRunner.createSchema('product_config', true);
    await queryRunner.createSchema('business_unit_service', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('product', true, true);
    await queryRunner.dropSchema('product_config', true, true);
    await queryRunner.dropSchema('business_unit_service', true, true);
  }
}

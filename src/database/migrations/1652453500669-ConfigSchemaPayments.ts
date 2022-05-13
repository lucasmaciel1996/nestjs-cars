import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfigSchemaPayments1652453500669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('financial', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('financial', true, true);
  }
}

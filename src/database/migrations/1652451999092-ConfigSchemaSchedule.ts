import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfigSchemaSchedule1652451999092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('schedule', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('schedule', true, true);
  }
}

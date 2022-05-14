import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Companies1652451906491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        schema: 'business_unit',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar(100)',
          },
          {
            name: 'id_legacy',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'score',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('business_unit.companies');
  }
}

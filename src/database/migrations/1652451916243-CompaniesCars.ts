import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CompaniesCars1652451916243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies_cars',
        schema: 'companies',
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
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
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

    await queryRunner.createForeignKey(
      'companies.companies_cars',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies.companies',
        onDelete: 'CASCADE',
        name: 'fk_company_companies',
      }),
    );

    await queryRunner.createForeignKey(
      'companies.companies_cars',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicles.cars',
        onDelete: 'CASCADE',
        name: 'fk_car_companies',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'companies.companies_cars',
      'fk_car_companies',
    );
    await queryRunner.dropForeignKey(
      'companies.companies_cars',
      'fk_company_companies',
    );
    await queryRunner.dropTable('companies.companies_cars');
  }
}

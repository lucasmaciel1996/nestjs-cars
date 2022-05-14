import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CompaniesCars1652451999094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies_cars',
        schema: 'product',
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
            name: 'daily_rate',
            type: 'decimal(12,2)',
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
      'product.companies_cars',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'business_unit.companies',
        onDelete: 'CASCADE',
        name: 'fk_company_companies',
      }),
    );

    await queryRunner.createForeignKey(
      'product.companies_cars',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicle.cars',
        onDelete: 'CASCADE',
        name: 'fk_car_companies',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'product.companies_cars',
      'fk_car_companies',
    );
    await queryRunner.dropForeignKey(
      'product.companies_cars',
      'fk_company_companies',
    );

    await queryRunner.dropTable('product.companies_cars');
  }
}

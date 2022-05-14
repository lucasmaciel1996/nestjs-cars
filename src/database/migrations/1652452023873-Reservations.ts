import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Reservations1652452023873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        schema: 'business_unit_service',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'business_unit_product_id',
            type: 'int4',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'int4',
            default: 1,
          },
          {
            name: 'datetime_start',
            type: 'timestamptz',
          },
          {
            name: 'datetime_end',
            type: 'timestamptz',
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
      'business_unit_service.reservations',
      new TableForeignKey({
        columnNames: ['business_unit_product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_config.business_unit_products',
        onDelete: 'CASCADE',
        name: 'fk_business_unit_products_reservations',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'business_unit_service.reservations',
      'fk_business_unit_products_reservations',
    );

    await queryRunner.dropTable('business_unit_service.reservations');
  }
}

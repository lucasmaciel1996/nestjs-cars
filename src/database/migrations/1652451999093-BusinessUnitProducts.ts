import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BusinessUnitProducts1652451999093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'business_unit_products',
        schema: 'product_config',
        columns: [
          {
            name: 'id',
            type: 'serial4',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar(50)',
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

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product_config.business_unit_products', ['id', 'slug'])
      .values([
        { id: 1, slug: 'CarReservations' },
        { id: 2, slug: 'BarberReservations' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_config.business_unit_products');
  }
}

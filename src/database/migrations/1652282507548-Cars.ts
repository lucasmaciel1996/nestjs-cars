import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Cars1652282507548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        schema: 'vehicle',
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
            name: 'plate',
            type: 'varchar(15)',
          },
          {
            name: 'brand_id',
            type: 'integer',
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
      'vehicle.cars',
      new TableForeignKey({
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicle.brand',
        onDelete: 'CASCADE',
        name: 'fk_cars_brand',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vehicle.cars', 'fk_cars_brand');
    await queryRunner.dropTable('vehicle.cars');
  }
}

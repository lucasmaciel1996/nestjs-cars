import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Brand1652281068880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'brand',
        schema: 'vehicles',
        columns: [
          {
            name: 'id',
            type: 'integer',
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
      .into('vehicles.brand', ['id', 'slug'])
      .values([
        { id: 1, slug: 'Fiat' },
        { id: 2, slug: 'Mercedes' },
        { id: 3, slug: 'Audi' },
        { id: 4, slug: 'BMW' },
        { id: 5, slug: 'Ford' },
        { id: 6, slug: 'Ferrari' },
        { id: 7, slug: 'Kia' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicles.brand');
  }
}

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
        schema: 'schedule',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
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
            name: 'status',
            type: 'integer',
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
      'schedule.reservations',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies.companies',
        onDelete: 'CASCADE',
        name: 'fk_reservation_companies',
      }),
    );

    await queryRunner.createForeignKey(
      'schedule.reservations',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicles.cars',
        onDelete: 'CASCADE',
        name: 'fk_reservation_cars',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'schedule.reservations',
      'fk_reservation_companies',
    );
    await queryRunner.dropForeignKey(
      'schedule.reservations',
      'fk_reservation_cars',
    );
    await queryRunner.dropTable('schedule.reservations');
  }
}

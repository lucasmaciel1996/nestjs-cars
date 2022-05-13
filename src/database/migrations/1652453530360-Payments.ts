import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Payments1652453530360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        schema: 'financial',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'reservation_id',
            type: 'uuid',
          },
          {
            name: 'payment_fisrt',
            type: 'timestamptz',
          },
          {
            name: 'amount',
            type: 'decimal(12,2)',
          },
          {
            name: 'type',
            type: 'integer',
            default: 1,
          },
          {
            name: 'payment_amount',
            type: 'integer',
            isNullable: true,
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
      'financial.payments',
      new TableForeignKey({
        columnNames: ['reservation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'schedule.reservations',
        onDelete: 'CASCADE',
        name: 'fk_payment_reservations',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'financial.payments',
      'fk_payment_reservations',
    );
    await queryRunner.dropTable('schedule.reservations');
  }
}

import { Column, Entity } from 'typeorm';
import { DefaultAttributes } from '../../../database/default.attributes';
import { IReservationsStatus } from '../interfaces';

@Entity({
  schema: 'business_unit_service',
})
export class Reservations extends DefaultAttributes {
  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'product_config_id' })
  productConfigId: string;

  @Column()
  status: IReservationsStatus;

  @Column({ name: 'datetime_start' })
  datetimeStart: Date;

  @Column({ name: 'datetime_end' })
  datetimeEnd: Date;
}

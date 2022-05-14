import { EntityRepository, Repository } from 'typeorm';
import { Reservations } from '../entities/reservations.entity';
import { IAvailableReservationsByDateQueryDB } from '../interfaces';

@EntityRepository(Reservations)
export class ReservationsRepository extends Repository<Reservations> {
  availableReservationsByDate({
    limit = 2,
    offset = 0,
  }: {
    offset?: number;
    limit?: number;
  }): Promise<IAvailableReservationsByDateQueryDB[]> {
    return this.query(
      `
      select 
        c.id as company_id,
        c."name" as company_name,
        car.id as car_id,
        car."name" as car_name,
        car.plate as car_plate, 
        cc.daily_rate as car_daily_rate,
        b.slug as car_brand 
      from product.companies_cars cc 
      left join business_unit_service.reservations r on r.car_id = cc.car_id and r.deleted_at is null 
      join business_unit.companies c on c.id = cc.company_id 
      join vehicle.cars car on car.id = cc.car_id 
      join vehicle.brand b   on car.brand_id  = b.id 
      where cc.is_active is true and r.car_id is null 
      order by c.score desc
      offset $1 limit $2 ;
  `,
      [offset, limit],
    );
  }
}

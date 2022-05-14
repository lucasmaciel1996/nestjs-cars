import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from './repositories/reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async getAvailableReservations() {
    const reservationsAvailable =
      await this.reservationsRepository.availableReservationsByDate({});

    return reservationsAvailable?.map(
      ({
        company_id,
        company_name,
        car_id,
        car_name,
        car_plate,
        car_brand,
        car_daily_rate,
      }) => ({
        company: { id: company_id, name: company_name },
        car: {
          id: car_id,
          name: car_name,
          plate: car_plate,
          brand: car_brand,
          daily_rate: car_daily_rate,
        },
      }),
    );
  }
}

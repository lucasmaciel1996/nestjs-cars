import { Controller, Get, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  listAvailable(@Query() { from, to }: { from: string; to: string }) {
    console.log({ from, to });

    return this.reservationsService.getAvailableReservations();
  }
}

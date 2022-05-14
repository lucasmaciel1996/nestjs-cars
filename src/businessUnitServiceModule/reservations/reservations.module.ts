import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsRepository } from './repositories/reservations.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationsRepository])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}

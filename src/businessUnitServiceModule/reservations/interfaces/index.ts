export enum IReservationsStatus {
  'PENDING' = 0,
  'CONFIRMED' = 1,
  'CANCELED' = 2,
}

export interface IAvailableReservationsByDateQueryDB {
  company_id: string;
  company_name: string;
  car_id: string;
  car_name: string;
  car_plate: string;
  car_brand: string;
  car_daily_rate: number;
}

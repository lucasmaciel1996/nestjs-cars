import { Brand } from '../vehiclesModule/brand/entities/brancd.entity';
import { Cars } from '../vehiclesModule/cars/entities/cars.entity';

export class TestUtil {
  static giveReturnValidListCars(): Cars[] {
    return [
      {
        id: '1',
        name: 'car-1',
        plate: 'aaa1111',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'car-2',
        plate: 'aaa2222',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
  static giveReturnBrandList(): Brand[] {
    return [
      {
        id: 1,
        slug: 'Fiat',
      },
      {
        id: 2,
        slug: 'AUdi',
      },
    ];
  }

  static giveReturnBrandCountList(): { slug: string; count: number }[] {
    return [
      {
        count: 100,
        slug: 'Fiat',
      },
      {
        count: 200,
        slug: 'AUdi',
      },
    ];
  }
}

import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggingModule } from '../../../libs/logging/src';
import { TestUtil } from '../../shared/TestUtil';
import { CarsService } from './cars.service';
import { CarsRepository } from './repositories/cars.repository';

describe('CarsService', () => {
  let carsService: CarsService;

  const mockRepository = {
    getAll: jest.fn(),
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(CarsRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    carsService = moduleRef.get<CarsService>(CarsService);
  });

  afterEach(() => {
    mockRepository.getAll.mockReset();
    mockRepository.getById.mockReset();
  });

  describe('index', () => {
    it('shoud be able return an array of cars empty', async () => {
      mockRepository.getAll.mockReturnValue([]);

      expect(await carsService.index()).toStrictEqual([]);
    });

    it('shoud be able return an array of cars ', async () => {
      const car = TestUtil.giveReturnValidListCars();
      mockRepository.getAll.mockReturnValue(car);

      expect(await carsService.index()).toStrictEqual(car);
    });
  });

  describe('findOne', () => {
    it('should be able return a car', async () => {
      const [car] = TestUtil.giveReturnValidListCars();

      mockRepository.getById.mockReturnValue(car);

      expect(await carsService.findOne('')).toStrictEqual(car);
    });

    it('should be able return erro car not found', async () => {
      mockRepository.getById.mockReturnValue(null);
      expect(async () => await carsService.findOne('')).rejects.toThrowError(
        'Car not found!!',
      );
    });
  });
});

import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtil } from '../../shared/TestUtil';
import { CarsService } from './cars.service';
import { CarsRepository } from './repositories/cars.repository';

describe('CarsService', () => {
  let carsService: CarsService;

  const mockRepository = {
    getAll: jest.fn(),
    getById: jest.fn(),
  };

  beforeAll(async () => {
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
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('shoud be able return an array of cars ', async () => {
      const car = TestUtil.giveReturnValidListCars();
      mockRepository.getAll.mockReturnValue(car);

      expect(await carsService.index()).toStrictEqual(car);
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be able return a car', async () => {
      const [car] = TestUtil.giveReturnValidListCars();

      mockRepository.getById.mockReturnValue(car);

      expect(await carsService.findOne('')).toStrictEqual(car);
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('should be able return erro car not found', async () => {
      mockRepository.getById.mockReturnValue(null);

      expect(carsService.findOne('')).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });
  });
});

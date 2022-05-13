import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TestUtil } from '../../shared/TestUtil';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

describe('CarsController', () => {
  let carsController: CarsController;

  const mockService = {
    index: jest.fn(),
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [{ provide: CarsService, useValue: mockService }],
    }).compile();

    carsController = moduleRef.get<CarsController>(CarsController);
  });

  beforeEach(() => {
    mockService.index.mockReset();
    mockService.findOne.mockReset();
  });

  describe('index', () => {
    it('should return an array empty of cars', async () => {
      const result = [];

      mockService.index.mockResolvedValue(result);

      expect(await carsController.index()).toStrictEqual([]);
      expect(mockService.index).toHaveBeenCalledTimes(1);
    });

    it('should return an array of cars', async () => {
      const result = TestUtil.giveReturnValidListCars();

      mockService.index.mockResolvedValue(result);

      expect(await carsController.index()).toStrictEqual(result);
      expect(mockService.index).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a car', async () => {
      const [result] = TestUtil.giveReturnValidListCars();

      mockService.findOne.mockResolvedValue(result);

      expect(await carsController.findOne({ id: '' })).toStrictEqual(result);
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return erro car not found', async () => {
      mockService.findOne.mockRejectedValue(
        new NotFoundException('Car not found!!'),
      );

      expect(carsController.findOne({ id: '' })).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(mockService.findOne).toHaveBeenCalledTimes(1);
    });
  });
});

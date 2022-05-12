import { Controller, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggingModule } from '../../../libs/logging/src';
import { TestUtil } from '../../shared/TestUtil';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CarsRepository } from './repositories/cars.repository';

describe('CarsController', () => {
  let carsService: CarsService;
  let carsController: CarsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggingModule],
      controllers: [CarsController],
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(CarsRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    carsService = moduleRef.get<CarsService>(CarsService);
    carsController = moduleRef.get<CarsController>(CarsController);
  });

  describe('index', () => {
    it('should return an array empty of cars', async () => {
      const result = [];

      jest
        .spyOn(carsService, 'index')
        .mockImplementation(() => Promise.resolve(result));

      expect(await carsController.index()).toStrictEqual([]);
    });

    it('should return an array of cars', async () => {
      const result = TestUtil.giveReturnValidListCars();

      jest
        .spyOn(carsService, 'index')
        .mockImplementation(() => Promise.resolve(result));

      expect(await carsController.index()).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a car', async () => {
      const [result] = TestUtil.giveReturnValidListCars();

      jest
        .spyOn(carsService, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await carsController.findOne({ id: '' })).toStrictEqual(result);
    });

    it('should return erro car not found', async () => {
      jest
        .spyOn(carsService, 'findOne')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException('Car not found!!')),
        );

      expect(
        async () => await carsController.findOne({ id: '' }),
      ).rejects.toThrowError('Car not found!!');
    });
  });
});

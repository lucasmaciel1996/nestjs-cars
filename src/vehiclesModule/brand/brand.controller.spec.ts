import { Test } from '@nestjs/testing';
import { TestUtil } from '../../shared/test/TestUtil';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

describe('brandController', () => {
  const mockService = {
    getAll: jest.fn(),
    getBrandUsedAndCount: jest.fn(),
  };

  let brandController: BrandController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [{ provide: BrandService, useValue: mockService }],
    }).compile();

    brandController = moduleRef.get<BrandController>(BrandController);
  });

  beforeEach(() => {
    mockService.getAll.mockReset();
    mockService.getBrandUsedAndCount.mockReset();
  });

  describe('index', () => {
    it('shuld be able return array of brand', async () => {
      const result = TestUtil.giveReturnBrandList();

      mockService.getAll.mockResolvedValue(result);
      expect(await brandController.index()).toStrictEqual(result);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });

    it('shuld be able return empty array of brand', async () => {
      const result = null;

      mockService.getAll.mockResolvedValue(result);
      expect(await brandController.index()).toStrictEqual(result);
      expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('brandUsed', () => {
    it('should be able return list count used brand by car', async () => {
      const result = TestUtil.giveReturnBrandCountList();

      mockService.getBrandUsedAndCount.mockResolvedValue(result);
      expect(await brandController.brandUsed()).toStrictEqual(result);
      expect(mockService.getBrandUsedAndCount).toHaveBeenCalledTimes(1);
    });

    it('should be able return list empty used brand by car', async () => {
      const result = null;

      mockService.getBrandUsedAndCount.mockResolvedValue(result);
      expect(await brandController.brandUsed()).toStrictEqual(result);
      expect(mockService.getBrandUsedAndCount).toHaveBeenCalledTimes(1);
    });
  });
});

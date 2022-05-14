import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtil } from '../../shared/test/TestUtil';
import { BrandService } from './brand.service';
import { BrandRepository } from './repositories/brand.repository';

describe('brandService', () => {
  const mockRepository = {
    getAll: jest.fn(),
    countBrandUsed: jest.fn(),
  };

  let brandService: BrandService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: getRepositoryToken(BrandRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    brandService = moduleRef.get<BrandService>(BrandService);
  });

  beforeEach(() => {
    mockRepository.getAll.mockReset();
    mockRepository.countBrandUsed.mockReset();
  });

  describe('getAll', () => {
    it('shuld be able return array of brand', async () => {
      const result = TestUtil.giveReturnBrandList();

      mockRepository.getAll.mockResolvedValue(result);

      expect(await brandService.getAll()).toStrictEqual(result);
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('shuld be able return empty array of brand', async () => {
      const result = null;

      mockRepository.getAll.mockResolvedValue(result);
      expect(await brandService.getAll()).toStrictEqual(result);
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrandUsedAndCount', () => {
    it('should be able return list count used brand by car', async () => {
      const result = TestUtil.giveReturnBrandCountList();

      mockRepository.countBrandUsed.mockResolvedValue(result);
      expect(await brandService.getBrandUsedAndCount()).toStrictEqual(result);
      expect(mockRepository.countBrandUsed).toHaveBeenCalledTimes(1);
    });

    it('should be able return list empty used brand by car', async () => {
      const result = null;

      mockRepository.countBrandUsed.mockResolvedValue(result);
      expect(await brandService.getBrandUsedAndCount()).toStrictEqual(result);
      expect(mockRepository.countBrandUsed).toHaveBeenCalledTimes(1);
    });
  });
});

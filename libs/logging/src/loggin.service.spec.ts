import { Test } from '@nestjs/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let loggingService: LoggingService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LoggingService],
    }).compile();

    loggingService = moduleRef.get<LoggingService>(LoggingService);
  });

  describe('report', () => {
    it('shuld be able instantiated', () => {
      expect(loggingService).toBeDefined();
    });

    it('shuld be able report log', async () => {
      const log = { test: true };
      const consoleSpy = jest.spyOn(console, 'log');

      expect(await loggingService.report(log)).toBe(void 0);
      expect(consoleSpy).toHaveBeenCalledWith('LOG', log);
    });
  });
});

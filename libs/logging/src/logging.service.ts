import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  report(log: unknown) {
    console.log('LOG', log);
  }
}

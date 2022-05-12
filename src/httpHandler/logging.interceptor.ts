import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../../libs/logging/src';

@Injectable()
export class LoggingIntercptor implements NestInterceptor {
  constructor(private readonly logReport = new LoggingService()) {}

  private reportLog(log: unknown) {
    try {
      this.logReport.report(log);
    } catch (error) {
      console.log('ERROR Report Log', error);
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before');

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.reportLog({
          timestamp: new Date(),
          request: {
            url: context.switchToHttp()?.getRequest()?.url,
            method: context.switchToHttp()?.getRequest()?.method,
            paylooad: {
              body: JSON.stringify(context.switchToHttp()?.getRequest()?.body),
              params: JSON.stringify(
                context.switchToHttp()?.getRequest()?.params,
              ),
              query: JSON.stringify(
                context.switchToHttp()?.getRequest()?.query,
              ),
            },
          },
          response: {
            statsCode: context.switchToHttp()?.getResponse()?.statusCode,
          },
        });
        console.log(`After ... ${Date.now() - now}ms`);
      }),
    );
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './httpHandler/http-exception.filter';
import { LoggingIntercptor } from './httpHandler/logging.interceptor';

const DEFAULT_PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new LoggingIntercptor());

  await app.listen(DEFAULT_PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger();
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = (): any => {
    return momentTimezone(this)
          .tz('America/Sao_Paulo')
          .format('YYYY-MM-DD HH:mm:ss.SSS')
  } 

  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();

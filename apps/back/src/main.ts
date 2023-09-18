/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, Session, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get('port') || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

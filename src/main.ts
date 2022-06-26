// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { corsOptionsDelegate } from './cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.set('trust proxy', 1);
  app.enableCors(corsOptionsDelegate);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen('9002', () => {
    console.log(`http://localhost:9002`);
  });
}
bootstrap();

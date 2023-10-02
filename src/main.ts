import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

async function bootstrap() {
  //default log level is error, warn, log
  // TODO: check if log level is valid
  const logLevel = [...(new Set(['error', 'warn', ...(process.env.LOG_LEVEL || 'log').split(',')]))] as LogLevel[];

  //see https://docs.nestjs.com/faq/raw-body
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter(),
    {
      logger: logLevel,
      rawBody: true,
    });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //open api
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Line Dispatcher')
    .setDescription('The Line Dispatcher API description')
    .setVersion('0.1')
    .addTag('line-dispatcher')
    .addTag('line-webhook')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  const PORT = app.get(ConfigService).get<number>('PORT');

  await app.listen(PORT);
}
bootstrap();

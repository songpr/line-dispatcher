import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  //see https://docs.nestjs.com/faq/raw-body
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log', 'debug',],
      rawBody: true,
    });
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
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

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: ['error', 'warn', 'log', 'debug'],
    });
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  //open api
  const config = new DocumentBuilder()
    .setTitle('Line Dispatcher')
    .setDescription('The Line Dispatcher API description')
    .setVersion('0.1')
    .addTag('line-dispatcher')
    .addTag('line-webhook')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookEventModule } from './webhook-event/webhook-event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WebhookEventModule, ConfigModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

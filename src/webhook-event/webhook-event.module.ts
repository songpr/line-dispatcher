import { Module } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { WebhookEventController } from './webhook-event.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),],
  controllers: [WebhookEventController],
  providers: [WebhookEventService],
})
export class WebhookEventModule { }

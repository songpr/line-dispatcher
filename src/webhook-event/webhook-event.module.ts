import { Module } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { WebhookEventController } from './webhook-event.controller';

@Module({
  controllers: [WebhookEventController],
  providers: [WebhookEventService],
})
export class WebhookEventModule {}

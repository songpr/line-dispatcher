import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';
import { WebhookEventService } from './webhook-event.service';
import { WebhookEventController } from './webhook-event.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    CqrsModule,],
  controllers: [WebhookEventController],
  providers: [WebhookEventService,
    ReceiveWebhookEventCommandHandler,
  ],
})
export class WebhookEventModule { }

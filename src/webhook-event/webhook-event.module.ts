import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';
import { WebhookEventService } from './webhook-event.service';
import { WebhookEventController } from './webhook-event.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dispatcher } from './models/dispatcher.model';

@Module({
  imports: [ConfigModule, CqrsModule,],
  controllers: [WebhookEventController],
  providers: [WebhookEventService,
    ReceiveWebhookEventCommandHandler,
    {
      provide: Dispatcher,
      useFactory: (configService: ConfigService) => {
        const destination = configService.get<string>('LINE_OA_ID');
        return new Dispatcher(destination);
      },
      inject: [ConfigService],
    },
  ],
})
export class WebhookEventModule { }

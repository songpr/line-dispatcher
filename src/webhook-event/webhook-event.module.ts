import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';
import { WebhookEventService } from './webhook-event.service';
import { WebhookEventController } from './webhook-event.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dispatcher } from './models/dispatcher.model';
import { ForwardWebhookEventCommandHandler } from './commands/handlers/forward-webhook-event.handler';
import { DispatchersSagas } from './sagas/dispatchers.sagas';
import { PrismaService } from '../prisma.service';
import { PersistReceiveWebhookEventCommandJob } from './job/receive-webhook-event-command.job';

@Module({
  imports: [ConfigModule, CqrsModule],
  controllers: [WebhookEventController],
  providers: [
    WebhookEventService,
    ReceiveWebhookEventCommandHandler,
    ForwardWebhookEventCommandHandler,
    {
      provide: Dispatcher,
      useFactory: (configService: ConfigService) => {
        const destination = configService.get<string>('LINE_OA_ID');
        return new Dispatcher(destination);
      },
      inject: [ConfigService],
    },
    DispatchersSagas,
    PrismaService,
    PersistReceiveWebhookEventCommandJob,
  ],
})
export class WebhookEventModule {}

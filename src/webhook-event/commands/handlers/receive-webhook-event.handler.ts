import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommand } from '../receive-webhook-event.command';
import { Logger } from '@nestjs/common';
import { Dispatcher } from '../../models/dispatcher.model';
import { PrismaService } from '../../../prisma.service';
import { LineEvent } from '../../dto/create-webhook-event.dto';
import { LRUCache } from 'lru-cache';
import { ConfigService } from '@nestjs/config';
import { PersistReceiveWebhookEventCommandJob } from 'src/webhook-event/job/receive-webhook-event-command.job';

@CommandHandler(ReceiveWebhookEventCommand)
export class ReceiveWebhookEventCommandHandler
  implements ICommandHandler<ReceiveWebhookEventCommand>
{
  private readonly logger = new Logger(ReceiveWebhookEventCommandHandler.name);
  private readonly cache: LRUCache<string, LineEvent>;
  constructor(
    private publisher: EventPublisher,
    private readonly dispatcher: Dispatcher,
    private readonly prisma: PrismaService,
    private readonly job: PersistReceiveWebhookEventCommandJob,
    configService: ConfigService,
  ) {
    const cacheOptions = {
      max: configService.get<number>(
        'RECEIVE_LINE_WEBHOOK_EVENT_JOB_CACHE_MAX',
        100000,
      ),
      maxSize: configService.get<number>(
        'RECEIVE_LINE_WEBHOOK_EVENT_JOB_CACHE_MAXSIZE',
        500000,
      ),
      ttl: configService.get<number>(
        'RECEIVE_LINE_WEBHOOK_EVENT_JOB_CACHE_TTL',
        12 * 60 * 60 * 1000,
      ), //default 12 hours
    };
    this.cache = new LRUCache<string, LineEvent>(cacheOptions);
  }
  async execute(command: ReceiveWebhookEventCommand) {
    this.publisher.mergeObjectContext(this.dispatcher);
    this.job.addData(command); //add data to job for persisting
    this.dispatcher.receivedWebhookEvents(
      command.xLineSignature,
      command.rawWebhookEvent,
    );
  }
}

import Job from 'node-interval-job';
// Define your job here
import { ReceiveWebhookEventCommand } from '../commands/receive-webhook-event.command';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { WebhookEvent, Prisma } from '@prisma/client';

const logger = new Logger('PersistReceiveWebhookEventCommandJob:jobHandle');
const jobHandle = async (
  receiveWebhookEventCommands: ReceiveWebhookEventCommand[],
  job: PersistReceiveWebhookEventCommandJob,
) => {
  logger.log(`job: ${job.name}`);
  for (const command of receiveWebhookEventCommands) {
    job.log.debug(
      `command.signature: ${JSON.stringify(command.xLineSignature)}`,
    );
    const webhook = JSON.parse(command.rawWebhookEvent);
    const webhookEvents: WebhookEvent[] = [];
    for (const event of webhook.events) {
      const webhookEventCreate = {
        id: event.webhookEventId,
        type: event.type,
        mode: event.mode,
        timestamp: new Date(event.timestamp),
        replyToken: event.replyToken,
        isRedelivery: event.deliveryContext.isRedelivery,
        lineWebhookEvent: JSON.stringify(event),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const webhookEvent = await job.prisma.webhookEvent.upsert({
        where: { id: webhookEventCreate.id },
        //update only isRedelivery, lineWebhookEvent (json), updatedAt
        update: {
          isRedelivery: webhookEventCreate.isRedelivery,
          lineWebhookEvent: webhookEventCreate.lineWebhookEvent,
          updatedAt: webhookEventCreate.updatedAt,
        },
        create: webhookEventCreate,
      });
      webhookEvents.push(webhookEvent);
    }
    job.log.debug(`webhookEvents: ${JSON.stringify(webhookEvents)}`);
    const data: Prisma.LineWebhookCreateInput = {
      destination: webhook.destination,
      xLineSignature: command.xLineSignature,
      createdAt: new Date(),
      //this is lineWebhookDelivery mapping between webhookEvent and lineWebhooks not line webhookEvents
      webhookEvents: {
        create: webhookEvents.map((event) => {
          return {
            isRedelivery: event.isRedelivery,
            webhookEventId: event.id,
          };
        }),
      },
    };
    await job.prisma.lineWebhook.create({ data });
  }
};

@Injectable()
export class PersistReceiveWebhookEventCommandJob extends Job<
  ReceiveWebhookEventCommand,
  Logger
> {
  readonly logger = new Logger(PersistReceiveWebhookEventCommandJob.name);

  constructor(
    configService: ConfigService,
    readonly prisma: PrismaService,
  ) {
    const logger = new Logger(PersistReceiveWebhookEventCommandJob.name);
    const interval = configService.get<number>(
      'RECEIVE_LINE_WEBHOOK_EVENT_JOB_INTERVAL',
      500,
    );
    const max = configService.get<number>(
      'RECEIVE_LINE_WEBHOOK_EVENT_JOB_INTERVAL',
      500,
    );
    super({
      interval,
      max,
      jobHandle,
      name: PersistReceiveWebhookEventCommandJob.name,
      log: logger,
    });
    this.logger.log(`job: ${this.name}`);
  }

  addData(ReceiveWebhookEventCommand: ReceiveWebhookEventCommand) {
    super.addData(ReceiveWebhookEventCommand);
  }
}

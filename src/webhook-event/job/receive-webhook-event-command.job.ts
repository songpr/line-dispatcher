import Job from 'node-interval-job';

import { ReceiveWebhookEventCommand } from '../commands/receive-webhook-event.command';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { WebhookEvent, Prisma } from '@prisma/client';

const jobHandle = async (
  receiveWebhookEventCommands: ReceiveWebhookEventCommand[],
) => {
  for (const command of receiveWebhookEventCommands) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const job: ReceiveWebhookEventCommandJob = this; // ReceiveWebhookEventCommandJob have been binded to jobHandle this
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
    job.logger.debug(`webhookEvents: ${JSON.stringify(webhookEvents)}`);
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
  return null;
};
export class ReceiveWebhookEventCommandJob extends Job<ReceiveWebhookEventCommand> {
  readonly logger = new Logger(ReceiveWebhookEventCommandJob.name);

  constructor(
    readonly configService: ConfigService,
    readonly prisma: PrismaService,
  ) {
    const logger = new Logger(ReceiveWebhookEventCommandJob.name);
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
      name: ReceiveWebhookEventCommandJob.name,
      log: logger,
    });
    jobHandle.bind(this); //bind this job to jobHandle
  }

  addData(ReceiveWebhookEventCommand: ReceiveWebhookEventCommand) {
    super.addData(ReceiveWebhookEventCommand);
  }
}

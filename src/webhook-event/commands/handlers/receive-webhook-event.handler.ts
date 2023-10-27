import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommand } from '../receive-webhook-event.command';
import { Logger } from '@nestjs/common';
import { Dispatcher } from '../../models/dispatcher.model';
import { PrismaService } from '../../../prisma.service';
import { WebhookEvent, Prisma } from '@prisma/client';

@CommandHandler(ReceiveWebhookEventCommand)
export class ReceiveWebhookEventCommandHandler
  implements ICommandHandler<ReceiveWebhookEventCommand> {
  private readonly logger = new Logger(ReceiveWebhookEventCommandHandler.name);

  constructor(private publisher: EventPublisher, private readonly dispatcher: Dispatcher, private readonly prisma: PrismaService) { }
  async execute(command: ReceiveWebhookEventCommand) {
    this.publisher.mergeObjectContext(this.dispatcher);
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
        updatedAt: new Date()
      };
      const webhookEvent = await this.prisma.webhookEvent.upsert({
        where: { id: webhookEventCreate.id },
        //update only isRedelivery, lineWebhookEvent (json), updatedAt
        update: { isRedelivery: webhookEventCreate.isRedelivery, lineWebhookEvent: webhookEventCreate.lineWebhookEvent, updatedAt: webhookEventCreate.updatedAt },
        create: webhookEventCreate
      })
      webhookEvents.push(webhookEvent);
    }
    this.logger.debug(`webhookEvents: ${JSON.stringify(webhookEvents)}`);
    const data: Prisma.LineWebhookCreateInput = {
      destination: webhook.destination,
      xLineSignature: command.xLineSignature,
      createdAt: new Date(),
      //this is lineWebhookDelivery mapping between webhookEvent and lineWebhooks not line webhookEvents
      webhookEvents: {
        create: webhookEvents.map(event => {
          return {
            isRedelivery: event.isRedelivery,
            webhookEventId: event.id
          };
        })
      }
    };
    await this.prisma.lineWebhook.create({ data });
    this.dispatcher.receivedWebhookEvents(command.xLineSignature, command.rawWebhookEvent);
  }
}
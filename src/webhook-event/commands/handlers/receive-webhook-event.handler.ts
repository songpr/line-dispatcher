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
    const webhookEventCreatePromises = webhook.events.map(event => {
      const webhookEvent = {
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
      return this.prisma.webhookEvent.upsert({
        where: { id: webhookEvent.id },
        //update only isRedelivery, lineWebhookEvent, updatedAt
        update: { isRedelivery: webhookEvent.isRedelivery, lineWebhookEvent: webhookEvent.lineWebhookEvent, updatedAt: webhookEvent.updatedAt },
        create: webhookEvent
      })
    });
    const webhookEvents = await Promise.all(webhookEventCreatePromises) as WebhookEvent[];
    const data: Prisma.LineWebhookCreateInput = {
      destination: webhook.destination,
      lineWebhook: command.rawWebhookEvent,
      xLineSignature: command.xLineSignature,
      createdAt: new Date(),
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
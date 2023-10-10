import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommand } from '../receive-webhook-event.command';
import { Logger } from '@nestjs/common';
import { Dispatcher } from 'src/webhook-event/models/dispatcher.model';

@CommandHandler(ReceiveWebhookEventCommand)
export class ReceiveWebhookEventCommandHandler
  implements ICommandHandler<ReceiveWebhookEventCommand> {
  private readonly logger = new Logger(ReceiveWebhookEventCommandHandler.name);

  constructor(private publisher: EventPublisher, private readonly dispatcher: Dispatcher) { }
  async execute(command: ReceiveWebhookEventCommand) {
    this.publisher.mergeObjectContext(this.dispatcher);
    this.dispatcher.receivedWebhookEvents(command.xLineSignature, command.rawWebhookEvent);
  }
}
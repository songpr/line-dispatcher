import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommand } from '../receive-webhook-event.command';
import { Logger } from '@nestjs/common';

@CommandHandler(ReceiveWebhookEventCommand)
export class ReceiveWebhookEventCommandHandler
  implements ICommandHandler<ReceiveWebhookEventCommand> {
  private readonly logger = new Logger(ReceiveWebhookEventCommandHandler.name);
  constructor() { }
  async execute(command: ReceiveWebhookEventCommand) {
    this.logger.debug(command.rawWebhookEvent);
  }
}
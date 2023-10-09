import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommand } from './receive-webhook-event.command';

@CommandHandler(ReceiveWebhookEventCommand)
export class ReceiveWebhookEventCommandHandler
  implements ICommandHandler<ReceiveWebhookEventCommand> {
  constructor() {}

  async execute(command: ReceiveWebhookEventCommand) {
    // Your command logic goes here
  }
}
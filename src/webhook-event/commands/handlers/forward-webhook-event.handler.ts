import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ForwardWebhookEventCommand } from '../forward-webhook-event.command';

@CommandHandler(ForwardWebhookEventCommand)
export class ForwardWebhookEventCommandHandler
  implements ICommandHandler<ForwardWebhookEventCommand>
{
  private readonly logger = new Logger(ForwardWebhookEventCommandHandler.name);

  constructor() {}
  async execute(command: ForwardWebhookEventCommand) {
    this.logger.debug(
      `ForwardWebhookEventCommandHandler: ${command.lineSignature}`,
    );
  }
}

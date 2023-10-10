import { ReceiveWebhookEventCommand } from './commands/receive-webhook-event.command';
import { Injectable } from '@nestjs/common';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class WebhookEventService {
  constructor(private readonly commandBus: CommandBus) { }

  async receiveWebhookEvent(createWebhookEventDto: CreateWebhookEventDto, xLineSignature: string, rawWebhookEvent: string) {
    const command = new ReceiveWebhookEventCommand(createWebhookEventDto, xLineSignature, rawWebhookEvent);
    return this.commandBus.execute(command);
  }
}

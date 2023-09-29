import { Controller, Post, Body } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';

@Controller('webhook-event')
export class WebhookEventController {
  constructor(private readonly webhookEventService: WebhookEventService) {}

  @Post()
  create(@Body() createWebhookEventDto: CreateWebhookEventDto) {
    this.webhookEventService.create(createWebhookEventDto);
    return null; //return nothing as it is not defined in https://developers.line.biz/en/docs/messaging-api/receiving-messages/
  }
}

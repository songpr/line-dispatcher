import { Controller, Post, Body } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';

@Controller('webhook-event')
export class WebhookEventController {
  constructor(private readonly webhookEventService: WebhookEventService) {}

  @Post()
  create(@Body() createWebhookEventDto: CreateWebhookEventDto) {
    return this.webhookEventService.create(createWebhookEventDto);
  }
}

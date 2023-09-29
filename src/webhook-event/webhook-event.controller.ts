import { Controller, Post, Body, Logger } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';

@Controller('webhook-event')
export class WebhookEventController {
  constructor(private readonly webhookEventService: WebhookEventService) { }
  private readonly logger = new Logger(WebhookEventController.name);

  @Post()
  create(@Body() createWebhookEventDto: CreateWebhookEventDto) {
    this.logger.debug("createWebhookEventDto created", JSON.stringify(createWebhookEventDto))
    this.webhookEventService.create(createWebhookEventDto);
    return null; //return nothing as it is not defined in https://developers.line.biz/en/docs/messaging-api/receiving-messages/
  }
}

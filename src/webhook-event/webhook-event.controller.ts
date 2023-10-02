import { Controller, UseGuards, Post, Body, Logger } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';
import { LineSignatureGuard } from 'src/auth/line-signature/line-signature.guard';

@Controller('webhook-event')
@UseGuards(LineSignatureGuard)
export class WebhookEventController {
  constructor(private readonly webhookEventService: WebhookEventService) { }
  private readonly logger = new Logger(WebhookEventController.name);

  @Post()
  create(@Body() createWebhookEventDto: CreateWebhookEventDto) {
    this.logger.debug("createWebhookEventDto created", JSON.stringify(createWebhookEventDto))
    this.webhookEventService.create(createWebhookEventDto);
    return ''; //return nothing as it is not defined in https://developers.line.biz/en/docs/messaging-api/receiving-messages/
  }
}

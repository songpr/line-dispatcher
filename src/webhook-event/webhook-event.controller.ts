import { Controller, UseGuards, Post, Body, Logger } from '@nestjs/common';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';
import { LineSignatureGuard } from '../auth/line-signature/line-signature.guard';

@Controller('webhook-event')
@UseGuards(LineSignatureGuard)
export class WebhookEventController {
  constructor(private readonly webhookEventService: WebhookEventService) { }
  private readonly logger = new Logger(WebhookEventController.name);

  @Post()
  create(@Body() createWebhookEventDto: CreateWebhookEventDto) {
    this.webhookEventService.receiveWebhookEvent(createWebhookEventDto).catch((error) => {
      this.logger.error({ error: error.stack, createWebhookEventDto: createWebhookEventDto });
    });
    //always return 201, so that LINE will not resend the same event
    return ''; //return nothing as it is not defined in https://developers.line.biz/en/docs/messaging-api/receiving-messages/
  }
}

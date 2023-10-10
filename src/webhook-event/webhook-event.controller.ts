import { Controller, UseGuards, Post, Body, Logger, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';
import { LineSignatureGuard } from '../auth/line-signature/line-signature.guard';
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
@Controller('webhook-event')
@UseGuards(LineSignatureGuard)
export class WebhookEventController {
  constructor(private readonly webhookEventService: WebhookEventService) { }
  private readonly logger = new Logger(WebhookEventController.name);


  @Post()
  accept(@Body() createWebhookEventDto: CreateWebhookEventDto, @Headers('x-line-signature') xLineSignature: string, @Req() req: RawBodyRequest<FastifyRequest>) {
    this.receiveWebhookEvent(createWebhookEventDto, xLineSignature, req.rawBody.toString()).catch((error) => {
      this.logger.error({ error: error.stack, createWebhookEventDto: createWebhookEventDto });
    });
    this.logger.debug('return')
    //always return 201, so that LINE will not resend the same event
    return ''; //return nothing as it is not defined in https://developers.line.biz/en/docs/messaging-api/receiving-messages/
  }

  async receiveWebhookEvent(createWebhookEventDto: CreateWebhookEventDto, xLineSignature: string, rawWebhookEvent: string) {
    return this.webhookEventService.receiveWebhookEvent(createWebhookEventDto, xLineSignature, rawWebhookEvent);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';

@Injectable()
export class WebhookEventService {
  create(createWebhookEventDto: CreateWebhookEventDto) {
    return createWebhookEventDto;
  }

  findAll() {
    return `This action returns all webhookEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhookEvent`;
  }
}

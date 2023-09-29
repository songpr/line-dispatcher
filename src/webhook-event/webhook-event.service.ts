import { Injectable } from '@nestjs/common';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';

@Injectable()
export class WebhookEventService {
  create(createWebhookEventDto: CreateWebhookEventDto) {
    return `This action adds a new webhookEvent \n${createWebhookEventDto}`;
  }

  findAll() {
    return `This action returns all webhookEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhookEvent`;
  }
}

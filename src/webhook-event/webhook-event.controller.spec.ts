import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';
import { WebhookEventController } from './webhook-event.controller';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';
import { ConfigModule } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { RawBodyRequest } from '@nestjs/common';

describe('WebhookEventController', () => {
  let controller: WebhookEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(),
        CqrsModule,],
      controllers: [WebhookEventController],
      providers: [WebhookEventService,
        ReceiveWebhookEventCommandHandler,],
    }).compile();

    controller = module.get<WebhookEventController>(WebhookEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('accept webhook event', () => {
    it('support create webhook event', () => {
      const createWebhookEventDto = new CreateWebhookEventDto();
      expect(controller.create(createWebhookEventDto, '', { rawBody: '' } as unknown as RawBodyRequest<FastifyRequest>)).toBe('');
    });
  });
});


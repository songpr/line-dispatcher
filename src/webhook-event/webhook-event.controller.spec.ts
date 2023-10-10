import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';
import { WebhookEventController } from './webhook-event.controller';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { RawBodyRequest } from '@nestjs/common';
import { ForwardWebhookEventCommandHandler } from './commands/handlers/forward-webhook-event.handler';
import { Dispatcher } from './models/dispatcher.model';

describe('WebhookEventController', () => {
  let controller: WebhookEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, CqrsModule,],
      controllers: [WebhookEventController],
      providers: [WebhookEventService,
        ReceiveWebhookEventCommandHandler,
        ForwardWebhookEventCommandHandler,
        {
          provide: Dispatcher,
          useFactory: (configService: ConfigService) => {
            const destination = configService.get<string>('LINE_OA_ID');
            return new Dispatcher(destination);
          },
          inject: [ConfigService],
        },
      ],
    }).compile();

    controller = module.get<WebhookEventController>(WebhookEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('accept webhook event', () => {
    it('support create webhook event', () => {
      const createWebhookEventDto = new CreateWebhookEventDto();
      expect(controller.accept(createWebhookEventDto, '', { rawBody: '' } as unknown as RawBodyRequest<FastifyRequest>)).toBe('');
    });
  });
});


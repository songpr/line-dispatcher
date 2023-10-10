import { Test, TestingModule } from '@nestjs/testing';
import { WebhookEventService } from './webhook-event.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';

describe('WebhookEventService', () => {
  let service: WebhookEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule,],
      providers: [WebhookEventService,
        ReceiveWebhookEventCommandHandler,],
    }).compile();

    service = module.get<WebhookEventService>(WebhookEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

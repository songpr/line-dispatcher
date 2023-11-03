import { Test, TestingModule } from '@nestjs/testing';
import { WebhookEventService } from './webhook-event.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ReceiveWebhookEventCommandHandler } from './commands/handlers/receive-webhook-event.handler';
import { Dispatcher } from './models/dispatcher.model';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('WebhookEventService', () => {
  let service: WebhookEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, CqrsModule],
      providers: [
        WebhookEventService,
        ReceiveWebhookEventCommandHandler,
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

    service = module.get<WebhookEventService>(WebhookEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

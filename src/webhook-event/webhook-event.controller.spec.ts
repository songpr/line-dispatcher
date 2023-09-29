import { Test, TestingModule } from '@nestjs/testing';
import { WebhookEventController } from './webhook-event.controller';
import { WebhookEventService } from './webhook-event.service';
import { CreateWebhookEventDto } from './dto/create-webhook-event.dto';

describe('WebhookEventController', () => {
  let controller: WebhookEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookEventController],
      providers: [WebhookEventService],
    }).compile();

    controller = module.get<WebhookEventController>(WebhookEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('accept webhook event', () => {
    it('support create webhook event', () => {
      const createWebhookEventDto = new CreateWebhookEventDto();
      expect(controller.create(createWebhookEventDto)).toBe('');
    });
  });
});

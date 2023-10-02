import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(),],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    configService = app.get<ConfigService>(ConfigService);
  });
  describe('root', () => {
    it('should return "Hello World!"', () => {
      const greeting = configService.get<string>('GREETING');
      if (greeting) {
        expect(appController.getHello()).toBe(greeting);
      } else {
        expect(appController.getHello()).toBe('Hello World!');
      }
    });
  });
});

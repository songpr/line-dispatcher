import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookEventModule } from './webhook-event/webhook-event.module';

@Module({
  imports: [WebhookEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

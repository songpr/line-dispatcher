import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  const aWebhookEvent = `
  {
    "destination": "xxxxxxxxxx",
    "events": [
      {
        "type": "message",
        "message": {
          "type": "text",
          "id": "14353798921116",
          "text": "Hello, world"
        },
        "timestamp": 1625665242211,
        "source": {
          "type": "user",
          "userId": "U80696558e1aa831..."
        },
        "replyToken": "757913772c4646b784d4b7ce46d12671",
        "mode": "active",
        "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
        "deliveryContext": {
          "isRedelivery": false
        }
      },
      {
        "type": "follow",
        "timestamp": 1625665242214,
        "source": {
          "type": "user",
          "userId": "Ufc729a925b3abef..."
        },
        "replyToken": "bb173f4d9cf64aed9d408ab4e36339ad",
        "mode": "active",
        "webhookEventId": "01FZ74ASS536FW97EX38NKCZQK",
        "deliveryContext": {
          "isRedelivery": false
        }
      },
      {
        "type": "unfollow",
        "timestamp": 1625665242215,
        "source": {
          "type": "user",
          "userId": "Ubbd4f124aee5113..."
        },
        "mode": "active",
        "webhookEventId": "01FZ74B5Y0F4TNKA5SCAVKPEDM",
        "deliveryContext": {
          "isRedelivery": false
        }
      }
    ]
  }
  `;
  it('/webhook-event (POST)', () => {
    return request(app.getHttpServer())
      .post('/webhook-event')
      .send(aWebhookEvent)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect('');
  });
});

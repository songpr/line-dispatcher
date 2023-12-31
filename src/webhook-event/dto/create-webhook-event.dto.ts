import { ArrayNotEmpty, IsAlphanumeric, IsDefined, IsNotEmpty, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Source {
  type: string;
  @IsNotEmpty()
  userId: string;
  @IsOptional()
  groupId: string;
  @IsOptional()
  roomId: string;
}

class DeliveryContext {
  isRedelivery: boolean;
}

export class LineEvent {
  @IsNotEmpty()
  type: string;
  @Min(1)
  timestamp: number;
  @IsOptional()
  @ValidateNested()
  @Type(() => Source)
  source: Source;
  replyToken: string;
  mode: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  webhookEventId: string;
  @IsDefined()
  deliveryContext: DeliveryContext;
}

export class CreateWebhookEventDto {
  constructor() {
    this.receivedDatetime = new Date()
  }

  public readonly receivedDatetime: Date;
  @IsNotEmpty()
  @IsAlphanumeric()
  destination: string;
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LineEvent) //this is require to validate nested class
  events: LineEvent[];
}

/* example of webhook event
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
*/

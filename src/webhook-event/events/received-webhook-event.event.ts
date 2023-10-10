import { LineEvent } from "../dto/create-webhook-event.dto";

export class ReceivedWebhookEvent {
    destination: string;
    events: LineEvent[];
    receivedTimestamp: Date;
    lineSignature: string;
    rawWebhookEvent: string;
}

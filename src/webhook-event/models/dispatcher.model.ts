import { AggregateRoot } from '@nestjs/cqrs';
import { ReceivedWebhookEvent } from '../events/received-webhook-event.event';

export class Dispatcher extends AggregateRoot {
    constructor(private destination: string) {
        super();
        this.autoCommit = true;
    }

    receivedWebhookEvents(lineSignature: string, rawWebhookEvent: string) {
        // Business logic
        this.apply(new ReceivedWebhookEvent(this.destination, lineSignature, rawWebhookEvent));
    }
}
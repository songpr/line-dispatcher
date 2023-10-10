import { AggregateRoot } from '@nestjs/cqrs';
import { ReceivedWebhookEvent } from '../events/received-webhook-event.event';
import { Logger } from '@nestjs/common';

export class Dispatcher extends AggregateRoot {
    constructor(private destination: string) {
        super();
        this.autoCommit = true;
    }
    private readonly logger = new Logger(`${Dispatcher.name}<${this.destination}>`);
    receivedWebhookEvents(lineSignature: string, rawWebhookEvent: string) {
        // Business logic
        this.logger.debug(rawWebhookEvent);
        this.apply(new ReceivedWebhookEvent(this.destination, lineSignature, rawWebhookEvent));
    }
}
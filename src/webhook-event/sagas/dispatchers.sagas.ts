import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReceivedWebhookEvent } from '../events/received-webhook-event.event';
import { ForwardWebhookEventCommand } from '../commands/forward-webhook-event.command';

@Injectable()
export class DispatchersSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(ReceivedWebhookEvent),
        map(event => {
          return new ForwardWebhookEventCommand(event.lineSignature, event.rawWebhookEvent);
        }),
      );
  }
}
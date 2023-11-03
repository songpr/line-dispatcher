import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ReceivedWebhookEvent } from '../events/received-webhook-event.event';
import { ForwardWebhookEventCommand } from '../commands/forward-webhook-event.command';

@Injectable()
export class DispatchersSagas {
  @Saga()
  ReceivedWebhookEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReceivedWebhookEvent),
      delay(100),
      map((event) => {
        return new ForwardWebhookEventCommand(
          event.lineSignature,
          event.rawWebhookEvent,
        );
      }),
    );
  };
}

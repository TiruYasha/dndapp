import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PixiAction, PixiEvent } from './pixi-action.model';
import { PixiEventName } from './pixi-events.model';

const actions: PixiAction[] = [];

const allEventsSubject = new Subject<PixiEvent<any>>();
export const allEvents$ = allEventsSubject.asObservable();

export function listenToAction<T>(event: PixiEventName): Observable<PixiEvent<T>> {
    const action = getAction(event);

    if (action) { return action.subject.asObservable(); }

    const newAction: PixiAction = {
        event,
        subject: new Subject<T>()
    };
    actions.push(newAction);
    return newAction.subject.asObservable();
}

export function triggerAction<T>(event: PixiEventName, content: T, replayable = false): void {
    const action = getAction(event);
    const pixiEvent: PixiEvent<any> = {
        content,
        event
    };
    if (action) {
        action.subject.next(pixiEvent);
        allEventsSubject.next(pixiEvent);
    } else if (replayable) {
        const newAction: PixiAction = {
            event,
            subject: new ReplaySubject<T>(1)
        };
        actions.push(newAction);
        newAction.subject.next(pixiEvent);
        allEventsSubject.next(pixiEvent);
    }
}

function getAction(event: PixiEventName): PixiAction {
    return actions.filter(a => a.event === event)[0];
}

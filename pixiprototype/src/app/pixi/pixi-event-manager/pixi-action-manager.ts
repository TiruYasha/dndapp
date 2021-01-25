import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PixiAction } from './pixi-action.model';
import { PixiEvent } from './pixi-events.model';

const actions: PixiAction[] = [];

export function listenToAction<T>(event: PixiEvent): Observable<T> {
    const action = getAction(event);

    if (action) { return action.subject.asObservable(); }

    const newAction: PixiAction = {
        event: event,
        subject: new Subject<T>()
    };
    actions.push(newAction);
    return newAction.subject.asObservable();
}

export function triggerAction<T>(event: PixiEvent, content: T, replayable = false): void {
    const action = getAction(event);

    if (action) {
        action.subject.next(content);
    } else if (replayable) {
        const newAction: PixiAction = {
            event: event,
            subject: new ReplaySubject<T>(1)
        };
        actions.push(newAction);
        newAction.subject.next(content);
    }
}

function getAction(event: PixiEvent): PixiAction {
    return actions.filter(a => a.event === event)[0];
}

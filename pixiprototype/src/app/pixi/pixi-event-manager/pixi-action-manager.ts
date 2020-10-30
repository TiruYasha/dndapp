import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PixiAction } from './pixi-action.model';

const actions: PixiAction[] = [];

export function listenToAction<T>(name: string): Observable<T> {
    const action = getAction(name);

    if (action) { return action.subject.asObservable(); }

    const newAction: PixiAction = {
        name,
        subject: new Subject<T>()
    };
    actions.push(newAction);
    return newAction.subject.asObservable();
}

export function triggerAction<T>(name: string, content: T, replayable = false): void {
    const action = getAction(name);

    if (action) {
        action.subject.next(content);
    } else if (replayable) {
        const newAction: PixiAction = {
            name,
            subject: new ReplaySubject<T>(1)
        };
        actions.push(newAction);
        newAction.subject.next(content);
    }
}

function getAction(name: string): PixiAction {
    return actions.filter(a => a.name === name)[0];
}

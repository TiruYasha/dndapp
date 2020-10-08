import { Observable, Subject } from 'rxjs';
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

export function triggerAction<T>(name: string, content: T): void {
    const action = getAction(name);

    if (action) { action.subject.next(content); }
}

function getAction(name: string): PixiAction {
    return actions.filter(a => a.name === name)[0];
}

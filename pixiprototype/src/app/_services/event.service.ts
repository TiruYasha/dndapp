import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listenToAction, triggerAction } from '../pixi/pixi-event-manager/pixi-action-manager';
import { PixiEvent } from '../pixi/pixi-event-manager/pixi-action.model';
import { PixiEventName } from '../pixi/pixi-event-manager/pixi-events.enum';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    listenToEvent<T>(event: PixiEventName): Observable<PixiEvent<T>> {
        return listenToAction(event);
    }

    triggerEvent<T>(event: PixiEventName, content: T, replayable = false): void {
        triggerAction(event, content, replayable);
    }
}

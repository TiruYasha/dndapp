import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listenToAction, triggerAction } from '../pixi/pixi-event-manager/pixi-action-manager';
import { PixiEvent } from '../pixi/pixi-event-manager/pixi-events.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    listenToEvent<T>(event: PixiEvent): Observable<T> {
        return listenToAction(event);
    }

    triggerEvent<T>(event: PixiEvent, content: T, replayable = false): void {
        triggerAction(event, content, replayable);
    }
}
import { Subject } from 'rxjs';
import { PixiEventName } from './pixi-events.enum';

export interface PixiAction {
    event: PixiEventName;
    subject: Subject<any>;
}

export interface PixiEvent<T> {
    event: PixiEventName;
    content: T;
}


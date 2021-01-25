import { Subject } from 'rxjs';
import { PixiEvent } from './pixi-events.model';

export interface PixiAction{
    event: PixiEvent;
    subject: Subject<any>;
}

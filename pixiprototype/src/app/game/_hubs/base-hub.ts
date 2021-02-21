import { Subject } from 'rxjs';
import { Hub } from 'src/app/game/_hubs/hub';

export abstract class BaseHub {
    protected destroySubject = new Subject();

    abstract startListening(hub: Hub): void;
}

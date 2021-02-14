import { Subject } from 'rxjs';

export abstract class BaseHub {
    protected destroySubject = new Subject();

    abstract startListening(): void;
}

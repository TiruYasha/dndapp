import { Subject } from 'rxjs';
import { Hub } from '../_helpers/hub';

export abstract class BaseHub {
    protected destroySubject = new Subject();

    abstract startListening(): void;
}

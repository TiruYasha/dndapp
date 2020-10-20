import { Subject } from 'rxjs';

export interface PixiAction{
    name: string;
    subject: Subject<any>;
}

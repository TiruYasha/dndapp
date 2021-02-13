import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Hub } from '../_helpers/hub';
import { HubService } from '../_services/hub.service';
import { ObjectHub } from './object/object.hub';

@Injectable({
    providedIn: 'root'
})
export class GameHub {
    private hub: Hub;
    private hubSubject = new ReplaySubject<Hub>(1);

    hub$ = this.hubSubject.asObservable();

    constructor(
        private hubService: HubService) {
    }

    start(): void {
        this.hub = this.hubService.buildConnection('game');
        this.hub.start()
            .then(c => this.hubSubject.next(this.hub));
    }
}

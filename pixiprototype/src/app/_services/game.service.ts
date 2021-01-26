import { Injectable } from '@angular/core';
import { Hub } from '../_helpers/hub';
import { HubService } from './hub.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    hub: Hub;

    constructor(private hubService: HubService) {
        this.hub = hubService.buildConnection("game");
        this.hub.start();
    }
}

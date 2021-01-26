import { Injectable } from '@angular/core';
import { Hub } from '../_helpers/hub';
import { MoveObjectCommand } from '../_models/hub/commands/move-object.model';
import { HubService } from './hub.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    hub: Hub;

    constructor(private hubService: HubService) {
        this.hub = hubService.buildConnection('game');
        this.hub.start()
            .then(t => {
                this.moveObject();
            });
    }

    moveObject(): void {
        const moveObject: MoveObjectCommand = {
            newX: 10,
            newY: 30,
            objectId: '765c8568-d448-4bf2-b3ff-678d440c86c4'
        };
        this.hub.send('MoveObject', moveObject);
    }
}

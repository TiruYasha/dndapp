import { Injectable } from '@angular/core';
import { Hub } from 'src/app/_helpers/hub';
import { ObjectMoved } from 'src/app/game/playground/_hub-models/events/object-moved.model';
import { PlaygroundService } from 'src/app/game/playground/_services/playground.service';
import { HubEvents } from '../hub-events';

@Injectable({
    providedIn: 'root'
})
export class ObjectHubListener {

    constructor(private playgroundService: PlaygroundService) { }

    listenToHubEvents(hub: Hub): void {
        hub.on<ObjectMoved>(HubEvents.ObjectMoved, (data) => {
            const layer  = this.playgroundService.playground.getLayer(data.data.layerId);
            layer.moveObject(data.data.objectId, data.data.newX, data.data.newY);
        });
    }
}

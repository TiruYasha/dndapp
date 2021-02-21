import { Injectable } from '@angular/core';
import { Hub } from 'src/app/game/_hubs/hub';
import { ObjectHub } from './object/object.hub';
import { PlaygroundHub } from './playground/playground-hub.service';

@Injectable({
    providedIn: 'root'
})
export class GameHub {

    constructor(
        public hub: Hub,
        private objectHub: ObjectHub,
        private playgroundHub: PlaygroundHub) {
    }

    startConnection(): Promise<void> {
        return this.hub.start();
    }

    startListening(): void {
        this.objectHub.startListening(this.hub);
        this.playgroundHub.startListening(this.hub);
    }
}

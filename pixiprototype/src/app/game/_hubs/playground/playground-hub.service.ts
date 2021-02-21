import { Injectable } from '@angular/core';
import { PlaygroundService } from '../../playground/_services/playground.service';
import { BaseHub } from '../base-hub';
import { Hub } from '../hub';
import { HubEvents } from '../hub-events';
import { PlaygroundChanged } from '../models/events/playground-changed.model';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundHub extends BaseHub {

  constructor(private playgroundService: PlaygroundService) { super(); }

  startListening(hub: Hub): void {
    hub.on<PlaygroundChanged>(HubEvents.PlaygroundChanged, (data) => {
      this.playgroundService.changePlayground(data.data.playground);
    });
  }
}

import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GameHub } from '../game.hub';
import { HubCommand } from '../hub-commands';
import { BaseHub } from '../base-hub';
import { ObjectHubListener } from './object-hub-listener';
import { listenToAction } from 'src/app/game/pixi/pixi-event-manager/pixi-action-manager';
import { PixiEventName } from 'src/app/game/pixi/pixi-event-manager/pixi-events.enum';
import { Hub } from 'src/app/_helpers/hub';
import { MoveObjectCommand } from 'src/app/game/playground/_hub-models/comands/move-object.model';
import { PlaygroundService } from '../../playground/_services/playground.service';
import { ObjectMoved } from '../../pixi/pixi-events/object-moved.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectHub extends BaseHub {
  private hub!: Hub;

  constructor(
    private gameHub: GameHub,
    private playgroundService: PlaygroundService,
    private objectHubListener: ObjectHubListener) { super(); }

  startListening(): void {
    this.gameHub.hub$
      .pipe(takeUntil(this.destroySubject))
      .subscribe(hub => {
        this.hub = hub;

        this.objectHubListener.listenToHubEvents(hub);
        this.listenToGameEvents();
      });
  }

  private listenToGameEvents(): void {
    listenToAction<ObjectMoved>(PixiEventName.ObjectMoved)
      .pipe(takeUntil(this.destroySubject))
      .subscribe(o => {
        const moveObject: MoveObjectCommand = {
          playgroundId: this.playgroundService.playground.id,
          layerId: o.content.layerId,
          newX: o.content.newX,
          newY: o.content.newY,
          objectId: o.content.objectId
        };
        this.hub.send(HubCommand.MoveObject, moveObject);
      });
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { listenToAction } from '../../pixi/pixi-event-manager/pixi-action-manager';
import { PixiEventName } from '../../pixi/pixi-event-manager/pixi-events.enum';
import { ObjectMoved } from '../../pixi/pixi-events/object-moved.model';
import { Hub } from '../../_helpers/hub';
import { MoveObjectCommand } from '../../_models/hub/commands/move-object.model';
import { GameHub } from '../game.hub';
import { HubCommand } from '../hub-commands';
import { HubEvents } from '../hub-events';
import { BaseHub } from '../base-hub';
import { ObjectHubListener } from './object-hub-listener';

@Injectable({
  providedIn: 'root'
})
export class ObjectHub extends BaseHub {
  private hub: Hub;

  constructor(private gameHub: GameHub, private objectHubListener: ObjectHubListener) { super(); }

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
          layerId: o.content.layerId,
          newX: o.content.newX,
          newY: o.content.newY,
          objectId: o.content.objectId
        };
        this.hub.send(HubCommand.MoveObject, moveObject);
      });
  }
}

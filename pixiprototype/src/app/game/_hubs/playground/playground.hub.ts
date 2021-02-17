import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GameHub } from '../game.hub';
import { BaseHub } from '../base-hub';
import { Hub } from 'src/app/_helpers/hub';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundHub extends BaseHub {

  constructor(private gameHub: GameHub) { super(); }

  startListening(): void {
    this.gameHub.hub$
      .pipe(takeUntil(this.destroySubject))
      .subscribe(hub => {
      });
  }
}

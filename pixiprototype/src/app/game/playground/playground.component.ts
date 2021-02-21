import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlaygroundService } from 'src/app/game/playground/_services/playground.service';
import { ObjectHub } from '../_hubs/object/object.hub';
import { PlaygroundListItem } from '../_hubs/models/shared/playground-list-item.model';

@Component({
  selector: 'trpg-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  @ViewChild('playgroundCanvas')
  playgroundCanvas!: ElementRef;

  private destroySubject = new Subject();

  playgrounds$: Observable<PlaygroundListItem[]>;

  playGroundLoaded = false;
  constructor(
    private playgroundService: PlaygroundService) {
    this.playgrounds$ = this.playgroundService.getPlaygrounds();
    this.playgroundService.playground$.pipe(takeUntil(this.destroySubject))
      .subscribe(a => {
        const div = this.playgroundCanvas.nativeElement as HTMLDivElement;
        if (this.playGroundLoaded === true) {
          div.innerHTML = '';
        }
        div.appendChild(a.app.view);
        this.playGroundLoaded = true;
        a.setActiveLayerByName('Layer 2');
      });
  }

  ngOnInit(): void {
    console.log('loading');
  }

  changePlayground(playgroundId: string): void {
    this.playgroundService.connectToPlayground(playgroundId);
  }
}

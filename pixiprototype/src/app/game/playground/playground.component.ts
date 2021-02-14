import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlaygroundService } from 'src/app/game/playground/_services/playground.service';
import { ObjectHub } from '../_hubs/object/object.hub';

@Component({
  selector: 'trpg-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  @ViewChild('playgroundCanvas')
  playgroundCanvas: ElementRef;

  playGroundLoaded = false;
  constructor(
    private playgroundService: PlaygroundService,
    private objectHub: ObjectHub) { }

  ngOnInit(): void {
    // this.playgroundService.loadPlayground()
    //   .subscribe(a => {
    //     const div = this.playgroundCanvas.nativeElement as HTMLDivElement;
    //     div.appendChild(a.app.view);
    //     this.playGroundLoaded = true;
    //     a.setActiveLayerByName('Layer 2');

    //     this.objectHub.startListening();
    //   });
  }
}

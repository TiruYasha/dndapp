import { Component, OnInit } from '@angular/core';
import { allEvents$ } from 'src/app/pixi/pixi-event-manager/pixi-action-manager';
import { PixiEvent } from 'src/app/pixi/pixi-event-manager/pixi-action.model';
import { PixiEventName } from 'src/app/pixi/pixi-event-manager/pixi-events.model';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'trpg-event-logger',
  templateUrl: './event-logger.component.html',
  styleUrls: ['./event-logger.component.scss']
})
export class EventLoggerComponent implements OnInit {
  events: string[] = [];

  constructor() { }

  ngOnInit(): void {
    allEvents$.subscribe(event => {
      this.events.push(PixiEventName[event.event]);
    });
  }

}

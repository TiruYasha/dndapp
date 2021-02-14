import { Component, OnInit } from '@angular/core';
import { allEvents$ } from '../../pixi/pixi-event-manager/pixi-action-manager';
import { PixiEventName } from '../../pixi/pixi-event-manager/pixi-events.enum';

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

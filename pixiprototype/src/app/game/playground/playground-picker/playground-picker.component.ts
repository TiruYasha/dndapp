import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaygroundListItem } from '../_models/playground-list-item.model';

@Component({
  selector: 'trpg-playground-picker',
  templateUrl: './playground-picker.component.html',
  styleUrls: ['./playground-picker.component.scss']
})
export class PlaygroundPickerComponent {

  @Input()
  playgrounds: PlaygroundListItem[];

  @Output()
  selectPlayground = new EventEmitter<string>();

  constructor() { }

  playgroundClicked(playgroundId: string): void {
    this.selectPlayground.next(playgroundId);
  }
}

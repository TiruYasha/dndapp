import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaygroundModel } from '../game/playground/_models/playground.model';

@Component({
  selector: 'trpg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'pixiprototype';
  playground$: Observable<PlaygroundModel>;

  constructor() {

  }

  ngOnInit(): void {
    // this.playground$ = this.playgroundService.loadPlayground();
  }
}

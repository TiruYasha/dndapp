import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaygroundModel } from '../_models/playground/playground.model';
import { PlaygroundService } from '../_services/playground.service';

@Component({
  selector: 'trpg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'pixiprototype';
  playground$: Observable<PlaygroundModel>;

  constructor(private playgroundService: PlaygroundService) {

  }

  ngOnInit(): void {
    // this.playground$ = this.playgroundService.loadPlayground();
  }
}

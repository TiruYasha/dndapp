import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaygroundModel } from './_models/playground/playground.model';
import { PlaygroundService } from './_services/playground.service';

@Component({
  selector: 'trpg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pixiprototype';
  playground$: Observable<PlaygroundModel>;

  constructor(private playgroundService: PlaygroundService) {

  }

  ngOnInit(): void {
    this.playground$ = this.playgroundService.getPlayground();
  }

}

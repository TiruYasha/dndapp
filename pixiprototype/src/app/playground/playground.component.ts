import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from '../_services/playground.service';

@Component({
  selector: 'trpg-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {
    this.playgroundService.loadPlayground()
      .subscribe(a => {
        document.body.appendChild(a.view);
      });
  }

}

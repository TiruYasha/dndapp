import { Component, OnInit } from '@angular/core';
import { GameHub } from '../_hubs/game.hub';

@Component({
  selector: 'trpg-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameHub: GameHub) { }

  ngOnInit(): void {
    this.gameHub.start();
  }

}

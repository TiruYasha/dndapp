import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundModule } from '../playground/playground.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    PlaygroundModule,
    GameRoutingModule
  ]
})
export class GameModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { PlaygroundModule } from './playground/playground.module';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    PlaygroundModule,
    GameRoutingModule
  ]
})
export class GameModule { }

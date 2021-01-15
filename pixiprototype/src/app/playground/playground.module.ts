import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { ToolsComponent } from './tools/tools.component';



@NgModule({
  declarations: [PlaygroundComponent, ToolsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { ToolsComponent } from './tools/tools.component';
import { EventLoggerComponent } from './event-logger/event-logger.component';
import { PlaygroundPickerComponent } from './playground-picker/playground-picker.component';



@NgModule({
  declarations: [PlaygroundComponent, ToolsComponent, EventLoggerComponent, PlaygroundPickerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }

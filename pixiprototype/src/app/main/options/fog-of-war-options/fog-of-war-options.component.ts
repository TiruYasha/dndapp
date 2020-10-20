import { Component, Input, OnInit, Output } from '@angular/core';
import { FogOfWarTool } from 'src/app/pixi/tools/fog-of-war-tool/fog-of-war-tool';

@Component({
  selector: 'trpg-fog-of-war-options',
  templateUrl: './fog-of-war-options.component.html',
  styleUrls: ['./fog-of-war-options.component.scss']
})
export class FogOfWarOptionsComponent implements OnInit {

  @Input()
  fogOfWar: FogOfWarTool;

  constructor() { }

  ngOnInit(): void {
  }

}

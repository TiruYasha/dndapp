import { Component, Input, OnInit } from '@angular/core';
import { DrawShapeTool } from 'src/app/pixi/tools/draw-shape-tool/draw-shape-tool.model';

@Component({
  selector: 'trpg-draw-shape-options',
  templateUrl: './draw-shape-options.component.html',
  styleUrls: ['./draw-shape-options.component.scss']
})
export class DrawShapeOptionsComponent implements OnInit {

  @Input()
  drawShapeTool: DrawShapeTool;

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log(target.value.replace('#', '0x'));
    // tslint:disable-next-line: radix
    const color = parseInt(target.value.replace('#', '0x'), 16);
    console.log(color);
    this.drawShapeTool.setColor(color);
  }

}

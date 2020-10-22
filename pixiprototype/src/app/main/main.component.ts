import { Component, OnInit } from '@angular/core';
import { Application } from 'pixi.js';
import { Observable } from 'rxjs';
import { Rectangle } from '../pixi/pixi-objects/rectangle.model';
import { Layer } from '../pixi/pixi-structure/layer.model';
import { Playground } from '../pixi/pixi-structure/playground.model';
import { Tool } from '../pixi/tools/tool.model';
import { ToolType } from '../pixi/tools/tool.type';

@Component({
  selector: 'trpg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  app: Application = new Application({ width: 700, height: 600, backgroundColor: 0xffffff });
  playground: Playground;

  toolType = ToolType;

  layers$: Observable<Layer[]>;
  activeLayer$: Observable<Layer>;
  activeTool$: Observable<Tool>;

  constructor() { }

  ngOnInit(): void {
    document.body.appendChild(this.app.view);
    this.app.stage.width = 700;
    this.app.stage.height = 600;
    this.playground = new Playground(this.app);

    const layer = this.playground.getLayer('default');
    layer.addObject(this.createRectangle());
    layer.addObject(this.createRectangle());

    const testLayer = this.playground.addLayerQuick('test 2', -10);

    testLayer.addObject(this.createRectangle2());

    this.layers$ = this.playground.layers$;
    this.activeLayer$ = this.playground.activeLayer$;
    this.activeTool$ = this.playground.activeTool$;

    this.playground.setActiveLayer(layer);
    this.playground.setActiveTool(ToolType.FogOfWar);
  }

  selectTool(toolType: ToolType): void {
    this.playground.setActiveTool(toolType);
  }

  setActiveLayer(layer: Layer): void {
    this.playground.setActiveLayer(layer);
  }

  changeOptions(event): void {
    console.log(event);
  }

  private createRectangle2(): Rectangle {
    const rectangle = new Rectangle({
      width: 150,
      height: 150,
      x: 170,
      y: 300,
      lineStyle: {
        width: 0,
        color: 0x000000,
        alpha: 1
      },
      fillColor: {
        colorInHex: 0x000000
      }
    },
      this.app.stage);

    return rectangle;
  }

  private createRectangle(): Rectangle {
    const rectangle = new Rectangle({
      width: 80,
      height: 80,
      x: 170,
      y: 170,
      lineStyle: {
        width: 0,
        color: 0xFF3300,
        alpha: 1
      },
      fillColor: {
        colorInHex: 0xFF3300
      }
    },
      this.app.stage);

    return rectangle;
  }
}

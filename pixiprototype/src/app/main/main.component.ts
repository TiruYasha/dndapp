import { stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Application, Container, Graphics } from 'pixi.js';
import { Rectangle } from '../pixi-objects/rectangle.model';
import { Playground } from '../pixi-structure/playground.model';
import { createGizmo } from '../tools/move-tool/move-tool-object-creator';
import { ToolType } from '../tools/tool.type';
import { Tool } from '../tools/tool.model';
import { Layer } from '../pixi-structure/layer.model';
import { Observable } from 'rxjs';
import { DrawShapeTool } from '../tools/draw-shape-tool/draw-shape-tool.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  app: Application = new Application({ width: 700, height: 600 });
  playground: Playground;

  toolType = ToolType;

  layers$: Observable<Layer[]>;
  activeLayer$: Observable<Layer>;

  constructor() { }

  ngOnInit(): void {
    document.body.appendChild(this.app.view);
    this.app.stage.width = 700;
    this.app.stage.height = 600;
    this.playground = new Playground(this.app);

    const layer = this.playground.getLayer('default');
    layer.addObject(this.createRectangle());
    layer.addObject(this.createRectangle());

    const testLayer = this.playground.addLayer('test 2', -10);

    testLayer.addObject(this.createRectangle2());

    this.layers$ = this.playground.layers$;
    this.activeLayer$ = this.playground.activeLayer$;

    this.playground.setActiveLayer(layer);
    this.playground.setActiveTool(ToolType.DrawShape);
  }

  selectTool(toolType: ToolType): void {
    this.playground.setActiveTool(toolType);
  }

  setActiveLayer(layer: Layer): void {
    this.playground.setActiveLayer(layer);
  }

  private createRectangle2(): Rectangle {
    const rectangle = new Rectangle({
      width: 150,
      height: 150,
      x: 170,
      y: 300,
      lineStyle: {
        width: 0,
        color: 0xffffff,
        alpha: 1
      },
      fillColor: {
        colorInHex: 0xffffff
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

import { Component, Input, OnInit } from '@angular/core';
import { Application } from 'pixi.js';
import { BasePixiObject } from 'src/app/pixi/pixi-objects/base-pixi-object.model';
import { Rectangle } from 'src/app/pixi/pixi-objects/rectangle.model';
import { Layer } from 'src/app/pixi/pixi-structure/layer.model';
import { Playground } from 'src/app/pixi/pixi-structure/playground.model';
import { createRectangle } from 'src/app/pixi/tools/move-tool/move-tool-object-creator';
import { CanvasObject } from 'src/app/_models/playground/canvas-objects/canvas-object.model';
import { CanvasObjectType } from 'src/app/_models/playground/canvas-objects/canvas-object.type';
import { RectangleModel } from 'src/app/_models/playground/canvas-objects/rectangle.model';
import { PlaygroundModel } from 'src/app/_models/playground/playground.model';
import { GameService } from 'src/app/_services/game.service';

@Component({
  selector: 'trpg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input()
  playground: PlaygroundModel;

  playgroundIntern: Playground;
  app: Application;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.app = new Application({ width: 700, height: 600, backgroundColor: 0xffffff });
    this.app.stage.width = 700;
    this.app.stage.height = 600;
    document.body.appendChild(this.app.view);

    this.playgroundIntern = new Playground(this.app);
    this.addLayers();

  }

  private addLayers(): void {
    this.playground.layers.forEach(l => {
      const layer = new Layer(l.name, l.order);
      this.playgroundIntern.addLayer(layer);
      this.addCanvasObjectsToLayer(layer, l.canvasObjects);
    });
  }

  private addCanvasObjectsToLayer(layer: Layer, canvasObjects: CanvasObject[]): void {
    canvasObjects.forEach(c => {
      let pixiObject: BasePixiObject;
      if (c.type === CanvasObjectType.Rectangle) {
        pixiObject = this.createRectangle(c as RectangleModel);
      }
      console.log(pixiObject);
      layer.addObject(pixiObject);
    });
  }
  createRectangle(r: RectangleModel): BasePixiObject {
    const rectangle = new Rectangle({
      height: r.height,
      width: r.width,
      x: r.x,
      y: r.y,
      fillColor: {
        colorInHex: r.colorInHex
      }
    });

    return rectangle;
  }

}

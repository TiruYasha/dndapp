import { stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Application, Container, Graphics } from 'pixi.js';
import { Rectangle } from '../pixi-objects/rectangle.model';
import { Playground } from '../pixi-structure/playground.model';
import { createGizmo } from '../tools/move-tool/move-tool-object-creator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  app: Application = new Application({ width: 700, height: 600 });
  playground: Playground;

  constructor() { }

  ngOnInit(): void {
    document.body.appendChild(this.app.view);

    this.playground = new Playground(this.app);

    const layer = this.playground.layers[1];

    // const container = new Graphics();
    // const rectangle = new Graphics();
    // container.lineStyle(2, 0xff249c);
    // container.beginFill(0xffd724);
    // container.drawRect(0, 0, 0, 0);
    // container.endFill();
    //  container.x = 200;
    //  container.y = 200;
    // rectangle.beginFill(0xff249c);
    // rectangle.drawRect(0, 0, 100, 100);
    // rectangle.endFill();
    // container.addChild(rectangle);
    // const gizmo = createGizmo();
    // container.addChild(gizmo);
    // this.app.stage.addChild(container);

  
    // container.pivot.x = container.width / 2;
    // container.pivot.y = container.height / 2;
    // rectangle.pivot.x = rectangle.width / 2;
    // rectangle.pivot.y = rectangle.height / 2;
    // rectangle.x = container.width / 2;
    // rectangle.y = container.height / 2;
    // rectangle.interactive = true;
    // rectangle.buttonMode = true;
    // gizmo.x = 0;
    // gizmo.y = 0;
    // rectangle.on('pointerdown', (event) => {
    //   rectangle.width += 10;
    //   rectangle.height += 10;
    //   gizmo.x -= 5;
    //   gizmo.y -= 5;
    //   container.angle += 10;
    // });


    layer.addObject(this.createRectangle());
    layer.addObject(this.createRectangle());

    const testLayer = this.playground.addLayer('test 2', -10);

    testLayer.addObject(this.createRectangle2());

    this.app.stage.addChild(this.createRectangle().displayObject);

    const rectangle = this.createRectangle();
    //const rectangle2 = this.createRectangle();
    this.app.stage.addChild(rectangle.displayObject);
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
    rectangle.makeDraggable();

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
    rectangle.makeDraggable();

    return rectangle;
  }
}

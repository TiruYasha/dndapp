import { BasePixiObject } from '../../pixi/pixi-objects/base-pixi-object.model';
import { Rectangle } from '../../pixi/pixi-objects/rectangle.model';
import { RectangleModel } from '../_models/canvas-objects/rectangle.model';

export class PixiObjectMapper {
  mapRectangle(object: RectangleModel): Rectangle {
    const rectangle = new Rectangle(object.id, {
      height: object.height,
      width: object.width,
      x: object.x,
      y: object.y,
      fillColor: {
        colorInHex: object.colorInHex
      }
    });

    return rectangle;
  }
}

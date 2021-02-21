import { Injectable } from '@angular/core';
import { Rectangle } from '../../pixi/pixi-objects/rectangle.model';
import { RectangleModel } from '../../_hubs/models/shared/canvas-objects/rectangle.model';

@Injectable({
  providedIn: 'root'
})
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

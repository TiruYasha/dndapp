import { Injectable } from '@angular/core';
import { BasePixiObject } from '../../pixi/pixi-objects/base-pixi-object.model';
import { Layer } from '../../pixi/pixi-structure/layer.model';
import { CanvasObject } from '../_models/canvas-objects/canvas-object.model';
import { CanvasObjectType } from '../_models/canvas-objects/canvas-object.type';
import { RectangleModel } from '../_models/canvas-objects/rectangle.model';
import { PixiObjectMapper } from './pixi-object-mapper';

@Injectable({
    providedIn: 'root'
})
export class CanvasObjectMapper {

    constructor(private pixiObjectMapper: PixiObjectMapper) { }

    addCanvasObjectsToLayer(layer: Layer, objects: CanvasObject[]): void {
        objects.forEach(object => {
            let pixiObject: BasePixiObject;
            if (object.type === CanvasObjectType.Rectangle) {
                pixiObject = this.pixiObjectMapper.mapRectangle(object as RectangleModel);
            }
            layer.addObject(pixiObject);
        });
    }

    // private createRectangle(r: RectangleModel): BasePixiObject {
    //     const rectangle = new Rectangle(r.id, {
    //         height: r.height,
    //         width: r.width,
    //         x: r.x,
    //         y: r.y,
    //         fillColor: {
    //             colorInHex: r.colorInHex
    //         }
    //     });

    //     return rectangle;
    // }
}

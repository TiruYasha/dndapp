import { CanvasObject } from './canvas-object.model';
import { CanvasObjectType } from './canvas-object.type';

export class RectangleModel extends CanvasObject {
    height: number;
    width: number;
    colorInHex: number;

    constructor() {
        super(CanvasObjectType.Rectangle);
    }
}

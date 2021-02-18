import { CanvasObject } from './canvas-object.model';
import { CanvasObjectType } from './canvas-object.type';

export class RectangleModel extends CanvasObject {
    height = 0;
    width = 0;
    colorInHex = 0x00000;

    constructor() {
        super(CanvasObjectType.Rectangle);
    }
}

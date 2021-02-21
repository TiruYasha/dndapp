import { CanvasObjectType } from './canvas-object.type';

export abstract class CanvasObject {
    id = '';
    type: CanvasObjectType;
    x = 0;
    y = 0;

    constructor(type: CanvasObjectType) {
        this.type = type;
    }
}

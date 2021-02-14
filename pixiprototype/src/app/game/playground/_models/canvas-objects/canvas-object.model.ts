import { CanvasObjectType } from './canvas-object.type';

export abstract class CanvasObject {
    id: string;
    type: CanvasObjectType;
    x: number;
    y: number;

    constructor(type: CanvasObjectType) {
        this.type = type;
    }
}

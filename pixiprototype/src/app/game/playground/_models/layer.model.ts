import { CanvasObject } from './canvas-objects/canvas-object.model';

export class LayerModel {
    id = '';
    name = '';
    order = 0;
    canvasObjects: CanvasObject[];

    constructor() {
        this.canvasObjects = [];
    }
}

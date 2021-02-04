import { CanvasObject } from './canvas-objects/canvas-object.model';

export class LayerModel {
    id: string;
    name: string;
    order: number;
    canvasObjects: CanvasObject[];

    constructor() {
        this.canvasObjects = [];
    }
}

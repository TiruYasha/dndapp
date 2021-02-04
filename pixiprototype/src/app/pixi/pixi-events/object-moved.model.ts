import { BasePixiObject } from '../pixi-objects/base-pixi-object.model';

export interface ObjectMoved {
    objectId: string;
    newX: number;
    newY: number;
    layerId: string;
}

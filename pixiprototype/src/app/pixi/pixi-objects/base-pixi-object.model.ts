import { Container } from 'pixi.js';
import { PixiObjectType } from './pixi-object.type';

export abstract class BasePixiObject {
    type: PixiObjectType[] = [];

    protected constructor(public displayObject: Container, options: BaseOptions, protected parent: Container) {
        this.displayObject.x = options.x;
        this.displayObject.y = options.y;
    }
}

export class BaseOptions {
    x: number;
    y: number;
}

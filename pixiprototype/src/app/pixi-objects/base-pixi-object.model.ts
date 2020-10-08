import { Container, DisplayObject, Graphics, InteractionData, InteractionEvent } from 'pixi.js';

export abstract class BasePixiObject {
    protected constructor(public displayObject: Container, options: BaseOptions, protected parent: Container) {
        this.displayObject.x = options.x;
        this.displayObject.y = options.y;
    }
}

export class BaseOptions {
    x: number;
    y: number;
}

import { Container } from 'pixi.js';
import { PixiObjectType } from './pixi-object.type';

export abstract class BasePixiObject {
    type: PixiObjectType[] = [];

    protected constructor(public readonly id: string, public displayObject: Container, options: BaseOptions) {
        this.displayObject.x = options.x;
        this.displayObject.y = options.y;
    }

    move(newX, newY): void {
        this.displayObject.x = newX;
        this.displayObject.y = newY;
    }
}

export class BaseOptions {
    x: number;
    y: number;
}

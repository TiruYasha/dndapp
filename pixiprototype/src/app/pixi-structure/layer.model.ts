import { Container } from 'pixi.js';
import { BasePixiObject } from '../pixi-objects/base-pixi-object.model';

export class Layer {
    private container: Container;

    private pixiObjects: BasePixiObject[] = [];

    constructor(private name: string, private order: number, width: number, height: number) {
        this.container = new Container();
        this.container.zIndex = order;
    }

    addObject(pixiObject: BasePixiObject): void {
        this.pixiObjects.push(pixiObject);
        this.container.addChild(pixiObject.displayObject);
    }

    get layer(): Container {
        return this.container;
    }
}

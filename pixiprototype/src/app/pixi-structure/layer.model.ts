import { Container } from 'pixi.js';
import { BasePixiObject } from '../pixi-objects/base-pixi-object.model';
import { ClickableObject } from '../pixi-objects/clickable-pixi-object.model';
import { PixiObjectType } from '../pixi-objects/pixi-object.type';

export class Layer {

    private container: Container;
    private _pixiObjects: BasePixiObject[] = [];

    constructor(public name: string, private order: number, width: number, height: number) {
        this.container = new Container();
        this.container.zIndex = order;
    }

    addObject(pixiObject: BasePixiObject): void {
        this._pixiObjects.push(pixiObject);
        this.container.addChild(pixiObject.displayObject);
    }

    makeInteractable(): void {
        this.container.interactive = true;
    }

    get pixiObjects(): BasePixiObject[] { return this._pixiObjects; }

    get clickableObjects(): ClickableObject[] {
        return this._pixiObjects
            .filter<ClickableObject>((p): p is ClickableObject => p.type.some(s => s === PixiObjectType.Clickable));
    }

    get layer(): Container {
        return this.container;
    }
}

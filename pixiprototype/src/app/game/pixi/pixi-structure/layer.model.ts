import { Container } from 'pixi.js';
import { BasePixiObject } from '../pixi-objects/base-pixi-object.model';
import { ClickableObject } from '../pixi-objects/clickable-pixi-object.model';
import { PixiObjectType } from '../pixi-objects/pixi-object.type';

export class Layer {
    private _container: Container;
    private _pixiObjects: BasePixiObject[] = [];

    constructor(public readonly id: string, public name: string, public order: number) {
        this._container = new Container();
        this._container.name = name;
        this._container.zIndex = order;
    }

    get pixiObjects(): BasePixiObject[] { return this._pixiObjects; }

    get clickableObjects(): ClickableObject[] {
        return this._pixiObjects
            .filter<ClickableObject>((p): p is ClickableObject => p.type.some(s => s === PixiObjectType.Clickable));
    }

    get container(): Container {
        return this._container;
    }

    addObject(pixiObject: BasePixiObject): void {
        this._pixiObjects.push(pixiObject);
        this._container.addChild(pixiObject.displayObject);
    }

    makeInteractable(): void {
        this._container.interactive = true;
    }

    moveObject(objectId: string, newX: number, newY: number): void {
        const objectToMove = this.pixiObjects.filter(p => p.id === objectId)[0];

        if (!objectToMove) { return; }

        objectToMove.move(newX, newY);
    }
}

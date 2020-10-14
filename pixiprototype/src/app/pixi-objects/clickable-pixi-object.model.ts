import { Container } from 'pixi.js';
import { Subject } from 'rxjs';
import { triggerAction } from '../pixi-event-manager/pixi-action-manager';
import { ObjectSelected } from '../pixi-event-manager/select-action.model';
import { BaseOptions, BasePixiObject } from './base-pixi-object.model';
import { PixiObjectType } from './pixi-object.type';

export abstract class ClickableObject extends BasePixiObject {
    destroyObjectSelected$ = new Subject();

    constructor(object: Container, options: BaseOptions, parent: Container) {
        super(object, options, parent);

        this.type.push(PixiObjectType.Clickable);
    }

    enableClickable(): void {
        this.displayObject.interactive = true;
        this.displayObject.buttonMode = true;
        this.displayObject.on('pointerdown', () => this.onDragStart());
    }

    disableClickable(): void {
        this.displayObject.interactive = false;
        this.displayObject.buttonMode = false;
        this.displayObject.removeAllListeners();
    }

    private onDragStart(): void {
        triggerAction<ObjectSelected>('objectSelected', {
            object: this
        });
    }
}

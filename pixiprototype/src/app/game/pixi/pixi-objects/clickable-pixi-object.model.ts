import { Container } from 'pixi.js';
import { Subject } from 'rxjs';
import { triggerAction } from '../pixi-event-manager/pixi-action-manager';
import { PixiEventName } from '../pixi-event-manager/pixi-events.enum';
import { ObjectSelected } from '../pixi-events/object-selected.model';
import { BaseOptions, BasePixiObject } from './base-pixi-object.model';
import { PixiObjectType } from './pixi-object.type';

export abstract class ClickableObject extends BasePixiObject {
    destroyObjectSelected$ = new Subject();

    constructor(id: string, object: Container, options: BaseOptions) {
        super(id, object, options);

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
        triggerAction<ObjectSelected>(PixiEventName.ObjectClicked, {
            object: this
        });
    }
}

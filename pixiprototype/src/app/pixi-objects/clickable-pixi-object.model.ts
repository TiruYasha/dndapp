import { Container, DisplayObject, Graphics, InteractionData, InteractionEvent } from 'pixi.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { listenToAction, triggerAction } from '../pixi-event-manager/pixi-action-manager';
import { ObjectSelected } from '../pixi-event-manager/select-action.model';
import { BaseOptions, BasePixiObject } from './base-pixi-object.model';
import { Rectangle } from './rectangle.model';

export abstract class ClickableObject extends BasePixiObject {
    private data: InteractionData;
    private dragging = false;
    private draggingGizmo = false;
    private selected = false;
    private moveToolIsDrawn = false;

    destroyObjectSelected$ = new Subject();

    constructor(object: Container, options: BaseOptions, parent: Container) {
        super(object, options, parent);
    }

    makeDraggable(): void {
        this.displayObject.interactive = true;
        this.displayObject.buttonMode = true;
        this.displayObject.on('pointerdown', (event) => this.onDragStart(event));
    }

    private onDragStart(event: InteractionEvent): void {
        triggerAction<ObjectSelected>('objectSelected', {
            object: this
        });
    }

    private onDragEnd(): void {
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    private onDragMove(): void {
        if (this.dragging && !this.draggingGizmo) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.displayObject.x = newPosition.x;
            this.displayObject.y = newPosition.y;
        }
    }


}

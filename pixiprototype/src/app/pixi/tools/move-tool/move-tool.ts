import { Container, Graphics, InteractionEvent } from 'pixi.js';
import { Subject, Subscription } from 'rxjs';
import { listenToAction, triggerAction } from '../../pixi-event-manager/pixi-action-manager';
import { ObjectSelected } from '../../pixi-events/object-selected.model';
import { BasePixiObject } from '../../pixi-objects/base-pixi-object.model';
import { Playground } from '../../pixi-structure/playground.model';
import { Tool } from '../tool.model';
import { ToolType } from '../tool.type';
import {
    BottomGizmo, BottomLeftGizmo, BottomRightGizmo, Gizmo,
    LeftGizmo, RightGizmo, RotateGizmo, UpperGizmo, UpperLeftGizmo, UpperRightGizmo
} from './gizmo.model';
import { createContainer, createRectangle } from './move-tool-object-creator';
import { MultiSelectorTool } from './multi-selector-tool';
import { takeUntil } from 'rxjs/operators';
import { Layer } from '../../pixi-structure/layer.model';
import { PixiEventName } from '../../pixi-event-manager/pixi-events.enum';
import { ObjectMoved } from '../../pixi-events/object-moved.model';

export class MoveTool extends Tool {
    private destroySubject = new Subject();
    private activeLayer: Layer;

    private dragging: boolean;
    private childSelectedObject: BasePixiObject;
    private container: Container;
    private rectangle: Graphics;

    private gizmos: Gizmo[] = [];

    private multiSelectTool: MultiSelectorTool;

    constructor(playground: Playground) {
        super(playground, ToolType.Selector);
    }

    get mainContainer(): Container { return this.container; }

    get childRectangle(): Graphics { return this.rectangle; }
    get child(): Container { return this.childSelectedObject.displayObject; }

    enable(): void {
        this.setupMoveTool();

        listenToAction<Layer>(PixiEventName.LayerSwitched)
            .pipe(takeUntil(this.destroySubject))
            .subscribe((newActiveLayer) => this.newActiveLayerEnabled(newActiveLayer.content));

        listenToAction<ObjectSelected>(PixiEventName.ObjectClicked)
            .pipe(takeUntil(this.destroySubject))
            .subscribe(o => {
                this.childSelectedObject = o.content.object;
                this.objectSelected();
            });

        this.playground.backgroundLayer.container.on('pointerdown', this.backgroundClicked);

        this.multiSelectTool = new MultiSelectorTool(this.playground);
        this.multiSelectTool.enable();
    }

    disable(): void {
        this.container.removeAllListeners();
        this.rectangle.removeAllListeners();
        this.gizmos.forEach(g => g.displayObject.removeAllListeners());

        this.playground.toolsLayer.container.removeChildren();
        this.playground.activeLayer.clickableObjects.forEach(c => c.disableClickable());
        this.multiSelectTool.disable();
        this.destroySubject.next();
    }

    newActiveLayerEnabled(newActiveLayer: Layer): void {
        if (this.activeLayer) {
            this.activeLayer.clickableObjects.forEach(c => c.disableClickable());
        }

        this.activeLayer = newActiveLayer;
        this.makeInvisible();
        this.playground.activeLayer.clickableObjects.forEach(c => c.enableClickable());
    }

    private backgroundClicked = () => {
        this.makeInvisible();
    }

    private objectSelected(): void {
        this.dragging = true;
        this.makeVisible();
        this.centerMoveTool();
    }

    private onDragStart(): void {
        this.dragging = true;
    }

    private onDragEnd(): void {
        this.dragging = false;
        triggerAction<ObjectMoved>(PixiEventName.ObjectMoved, {
            objectId: this.childSelectedObject.id,
            newX: this.childSelectedObject.displayObject.x,
            newY: this.childSelectedObject.displayObject.y,
            layerId: this.activeLayer.id
        });
    }

    private onDragMove(event: InteractionEvent): void {
        if (this.dragging) {
            const newPosition = event.data.getLocalPosition(this.playground.toolsLayer.container);
            this.container.x = newPosition.x;
            this.container.y = newPosition.y;
            this.childSelectedObject.displayObject.x = newPosition.x;
            this.childSelectedObject.displayObject.y = newPosition.y;
            this.setGizmoPosition();
        }
    }

    private makeInvisible(): void {
        this.container.visible = false;

        this.gizmos.forEach(g => {
            g.visible = false;
        });
    }

    private makeVisible(): void {
        this.container.visible = true;

        this.gizmos.forEach(g => {
            g.visible = true;
        });
    }

    private centerMoveTool(): void {
        this.centerContainer();
        this.setGizmoPosition();
    }

    private setGizmoPosition(): void {
        this.gizmos.forEach(g => {
            g.resetPosition();
        });
    }

    private centerContainer(): void {
        this.container.x = this.child.x;
        this.container.y = this.child.y;
        this.rectangle.width = this.child.width;
        this.rectangle.height = this.child.height;

        this.container.angle = this.child.angle;
    }

    private setupGizmos(): void {
        this.setupGizmo<LeftGizmo>(LeftGizmo);
        this.setupGizmo<RightGizmo>(RightGizmo);
        this.setupGizmo<UpperGizmo>(UpperGizmo);
        this.setupGizmo<BottomGizmo>(BottomGizmo);
        this.setupGizmo<UpperLeftGizmo>(UpperLeftGizmo);
        this.setupGizmo<UpperRightGizmo>(UpperRightGizmo);
        this.setupGizmo<BottomLeftGizmo>(BottomLeftGizmo);
        this.setupGizmo<BottomRightGizmo>(BottomRightGizmo);
        this.setupGizmo<RotateGizmo>(RotateGizmo);
        this.playground.toolsLayer.container.addChild(this.container);

    }
    private setupGizmo<T extends Gizmo>(type: new (moveTool: MoveTool, moveCallback: () => void) => T): void {
        const gizmo = new type(this, () => {
            this.centerMoveTool();
        });
        this.gizmos.push(gizmo);
        this.container.addChild(gizmo.displayObject);
    }

    private setupMoveTool(): void {
        this.container = createContainer();
        this.rectangle = createRectangle();
        this.container.addChild(this.rectangle);
        this.rectangle.on('pointerdown', () => this.onDragStart())
            .on('pointerup', () => this.onDragEnd())
            .on('pointerupoutside', () => this.onDragEnd())
            .on('pointermove', (event) => this.onDragMove(event));
        this.setupGizmos();
    }
}

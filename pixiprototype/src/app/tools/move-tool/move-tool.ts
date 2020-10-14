import { Container, Graphics, InteractionEvent } from 'pixi.js';
import { Layer } from 'src/app/pixi-structure/layer.model';
import { listenToAction } from '../../pixi-event-manager/pixi-action-manager';
import { ObjectSelected } from '../../pixi-event-manager/select-action.model';
import { BasePixiObject } from '../../pixi-objects/base-pixi-object.model';
import { Tool } from '../tool.model';
import {
    BottomGizmo, BottomLeftGizmo, BottomRightGizmo, Gizmo,
    LeftGizmo, RightGizmo, RotateGizmo, UpperGizmo, UpperLeftGizmo, UpperRightGizmo
} from './gizmo.model';
import { createContainer, createRectangle } from './move-tool-object-creator';

export class MoveTool extends Tool {
    private dragging: boolean;
    private childSelectedObject: BasePixiObject;

    private container: Container;
    private rectangle: Graphics;

    private gizmos: Gizmo[] = [];

    private toolLayer: Container;

    get mainContainer(): Container { return this.container; }

    get childRectangle(): Graphics { return this.rectangle; }
    get child(): Container { return this.childSelectedObject.displayObject; }

    enable(): void {
        this.toolLayer = this.playground.toolsLayer.layer;
        this.setupMoveTool();

        listenToAction<ObjectSelected>('objectSelected')
            .subscribe(o => {
                this.childSelectedObject = o.object;
                this.objectSelected();
            });

        this.playground.activeLayer.clickableObjects.forEach(c => c.enableClickable());
    }

    disable(): void {
        this.container.removeAllListeners();
        this.rectangle.removeAllListeners();
        this.gizmos.forEach(g => g.displayObject.removeAllListeners());

        this.toolLayer.removeChildren();
        this.playground.activeLayer.clickableObjects.forEach(c => c.disableClickable());
    }

    activeLayerDisabled(): void {
        this.playground.activeLayer.clickableObjects.forEach(c => c.disableClickable());
        this.disable();
    }

    newActiveLayerEnabled(): void {
        this.playground.activeLayer.clickableObjects.forEach(c => c.enableClickable());
        this.enable();
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
    }

    private onDragMove(event: InteractionEvent): void {
        if (this.dragging) {
            const newPosition = event.data.getLocalPosition(this.toolLayer);
            this.container.x = newPosition.x;
            this.container.y = newPosition.y;
            this.childSelectedObject.displayObject.x = newPosition.x;
            this.childSelectedObject.displayObject.y = newPosition.y;
            this.setGizmoPosition();
        }
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
        this.toolLayer.addChild(this.container);

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

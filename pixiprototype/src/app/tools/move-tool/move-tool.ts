import { Container, Graphics, InteractionEvent } from 'pixi.js';
import { listenToAction } from '../../pixi-event-manager/pixi-action-manager';
import { ObjectSelected } from '../../pixi-event-manager/select-action.model';
import { BasePixiObject } from '../../pixi-objects/base-pixi-object.model';
import { gizmoResize } from './gizmo-action';
import { BottomGizmo, BottomLeftGizmo, BottomRightGizmo, LeftGizmo, RightGizmo, RotateGizmo, UpperGizmo, UpperLeftGizmo, UpperRightGizmo } from './gizmo.model';
import { GizmoType } from './gizmo.type';
import { createContainer, createGizmo, createRectangle } from './move-tool-object-creator';

export class MoveTool {
    private dragging: boolean;
    private childSelectedObject: BasePixiObject;

    private container: Container;
    private rectangle: Graphics;

    private leftGizmo: LeftGizmo;
    private rightGizmo: RightGizmo;
    private bottomGizmo: BottomGizmo;
    private upperGizmo: UpperGizmo;
    private upperLeftGizmo: UpperLeftGizmo;
    private upperRightGizmo: UpperRightGizmo;
    private bottomLeftGizmo: BottomLeftGizmo;
    private bottomRightGizmo: BottomRightGizmo;
    private rotateGizmo: RotateGizmo;

    constructor(private stage: Container) {
        this.setupMoveTool();

        listenToAction<ObjectSelected>('objectSelected')
            .subscribe(o => {
                this.childSelectedObject = o.object;
                this.objectSelected();
            });
    }

    get mainContainer(): Container { return this.container; }

    get childRectangle(): Graphics { return this.rectangle; }
    get child(): Container { return this.childSelectedObject.displayObject; }

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
            const newPosition = event.data.getLocalPosition(this.stage);
            this.container.x = newPosition.x;
            this.container.y = newPosition.y;
            this.childSelectedObject.displayObject.x = newPosition.x;
            this.childSelectedObject.displayObject.y = newPosition.y;
            this.setGizmoPosition();
        }
    }

    private makeVisible(): void {
        this.container.visible = true;
        this.leftGizmo.visible = true;
        this.rightGizmo.visible = true;
        this.upperGizmo.visible = true;
        this.bottomGizmo.visible = true;
        this.upperLeftGizmo.visible = true;
        this.upperRightGizmo.visible = true;
        this.bottomLeftGizmo.visible = true;
        this.bottomRightGizmo.visible = true;
        this.rotateGizmo.visible = true;
    }

    private centerMoveTool(): void {
        this.centerContainer();
        this.setGizmoPosition();
    }

    private setGizmoPosition(): void {
        this.leftGizmo.resetPosition();
        this.rightGizmo.resetPosition();
        this.upperGizmo.resetPosition();
        this.bottomGizmo.resetPosition();
        this.upperLeftGizmo.resetPosition();
        this.upperRightGizmo.resetPosition();
        this.bottomLeftGizmo.resetPosition();
        this.bottomRightGizmo.resetPosition();
        this.rotateGizmo.resetPosition();
    }

    private centerContainer(): void {
        this.container.x = this.child.x;
        this.container.y = this.child.y;
        this.rectangle.width = this.child.width;
        this.rectangle.height = this.child.height;
        
        this.container.angle = this.child.angle;
    }

    private setupGizmos(): void {
        this.leftGizmo = new LeftGizmo(this, () => {
            this.centerMoveTool();
        });
        this.rightGizmo = new RightGizmo(this, () => {
            this.centerMoveTool();
        });
        this.upperGizmo = new UpperGizmo(this, () => {
            this.centerMoveTool();
        });
        this.bottomGizmo = new BottomGizmo(this, () => {
            this.centerMoveTool();
        });
        this.upperLeftGizmo = new UpperLeftGizmo(this, () => {
            this.centerMoveTool();
        });
        this.upperRightGizmo = new UpperRightGizmo(this, () => {
            this.centerMoveTool();
        });
        this.bottomLeftGizmo = new BottomLeftGizmo(this, () => {
            this.centerMoveTool();
        });
        this.bottomRightGizmo = new BottomRightGizmo(this, () => {
            this.centerMoveTool();
        });
        this.rotateGizmo = new RotateGizmo(this, () => {
        });

        this.container.addChild(this.leftGizmo.displayObject);
        this.container.addChild(this.rightGizmo.displayObject);
        this.container.addChild(this.upperGizmo.displayObject);
        this.container.addChild(this.bottomGizmo.displayObject);
        this.container.addChild(this.upperLeftGizmo.displayObject);
        this.container.addChild(this.upperRightGizmo.displayObject);
        this.container.addChild(this.bottomLeftGizmo.displayObject);
        this.container.addChild(this.bottomRightGizmo.displayObject);
        this.container.addChild(this.rotateGizmo.displayObject);
        this.stage.addChild(this.container);

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

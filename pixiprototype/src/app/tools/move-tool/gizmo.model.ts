import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Container, Graphics, InteractionEvent } from 'pixi.js';
import { MoveTool } from './move-tool';
import { createGizmo } from './move-tool-object-creator';

export abstract class Gizmo {
    protected initialY = 0;
    protected initialHeight = 0;
    protected initialChildY = 0;

    protected initialX = 0;
    protected initialChildX = 0;
    protected initialWidth = 0;
    protected dragging = false;
    protected pivot = 'left';

    protected gizmo: Graphics;

    constructor(protected moveTool: MoveTool, private moveCallback: () => void) {
        this.gizmo = createGizmo();
        this.gizmo.on('pointerdown', (event) => this.onDragGizmoStart(event))
            .on('pointerup', () => this.onDragGizmoEnd())
            .on('pointerupoutside', () => this.onDragGizmoEnd())
            .on('pointermove', (event) => this.onDragGizmoMove(event));
    }

    protected abstract onGizmoMove(event: InteractionEvent): void;
    abstract resetPosition(): void;

    set visible(value: boolean) {
        this.gizmo.visible = value;
    }

    protected get child(): Container { return this.moveTool.child; }

    protected get childRectangle(): Container { return this.moveTool.childRectangle; }

    protected calculateXY(event: InteractionEvent, position: 'left' | 'right' | 'upper' | 'bottom' | 'corner'): void {
        if (position === 'left' || position === 'right') {
            this.child.x = this.initialChildX + ((event.data.global.x - this.initialX) * Math.cos(this.child.rotation) / 2);
            this.child.y = this.initialChildY + ((event.data.global.x - this.initialX) * Math.sin(this.child.rotation) / 2);
        }

        if (position === 'bottom' || position === 'upper') {
            this.child.x = this.initialChildX + ((this.initialY - event.data.global.y) * Math.sin(this.child.rotation) / 2);
            this.child.y = this.initialChildY + ((event.data.global.y - this.initialY) * Math.cos(this.child.rotation) / 2);
        }

        if (position === 'corner') {
            this.child.x = this.initialChildX + ((event.data.global.x - this.initialX) * Math.cos(this.child.rotation) / 2) +
                ((this.initialY - event.data.global.y) * Math.sin(this.child.rotation) / 2);

            this.child.y = this.initialChildY + ((event.data.global.x - this.initialX) * Math.sin(this.child.rotation) / 2) +
                ((event.data.global.y - this.initialY) * Math.cos(this.child.rotation) / 2);
        }
    }

    private onDragGizmoMove(event: InteractionEvent): void {
        if (this.dragging) {
            this.onGizmoMove(event);
            this.moveCallback();
        }
    }

    private onDragGizmoEnd(): void {
        this.dragging = false;
        this.child.updateTransform();
        const bounds = this.child.getLocalBounds();
        this.child.pivot.x = bounds.width / 2;
        this.child.pivot.y = bounds.width / 2;
    }

    private onDragGizmoStart(event: InteractionEvent): void {
        this.initialX = event.data.global.x;
        this.initialChildX = this.child.x;
        this.initialWidth = this.child.width;

        this.initialY = event.data.global.y;
        this.initialChildY = this.child.y;
        this.initialHeight = this.child.height;
        this.dragging = true;
    }


    get displayObject(): Graphics {
        return this.gizmo;
    }
}

export class LeftGizmo extends Gizmo {

    resetPosition(): void {
        if (0 + this.child.width > 0) {
            this.gizmo.x = -this.child.width / 2;
        } else {
            this.gizmo.x = this.child.width / 2;
        }
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.width = this.initialWidth - (event.data.global.x - this.initialX);

        this.calculateXY(event, 'left');
    }
}

export class RightGizmo extends Gizmo {
    resetPosition(): void {
        if (0 + this.child.width > 0) {
            this.gizmo.x = this.child.width / 2;
        } else {
            this.gizmo.x = -this.child.width / 2;
        }
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.width = this.initialWidth + (event.data.global.x - this.initialX);
        this.calculateXY(event, 'right');
    }
}

export class UpperGizmo extends Gizmo {
    resetPosition(): void {
        this.gizmo.x = 0;
        this.gizmo.y = -this.child.height / 2;
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.height = this.initialHeight + (this.initialY - event.data.global.y);
        this.calculateXY(event, 'upper');
    }
}

export class BottomGizmo extends Gizmo {
    resetPosition(): void {
        this.gizmo.x = 0;
        this.gizmo.y = this.child.height / 2;
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.height = this.initialHeight - (this.initialY - event.data.global.y);
        this.calculateXY(event, 'bottom');
    }
}

export class UpperLeftGizmo extends Gizmo {
    resetPosition(): void {
        this.gizmo.x = -this.child.width / 2;
        this.gizmo.y = -this.child.height / 2;
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.width = this.initialWidth - (event.data.global.x - this.initialX);
        this.child.height = this.initialHeight + (this.initialY - event.data.global.y);

        this.child.x = this.initialChildX + ((event.data.global.x - this.initialX) * Math.cos(this.child.rotation) / 2) +
            ((this.initialY - event.data.global.y) * Math.sin(this.child.rotation) / 2);

        this.child.y = this.initialChildY + ((event.data.global.x - this.initialX) * Math.sin(this.child.rotation) / 2) +
            ((event.data.global.y - this.initialY) * Math.cos(this.child.rotation) / 2);
    }
}

export class UpperRightGizmo extends Gizmo {
    resetPosition(): void {
        this.gizmo.x = +this.child.width / 2;
        this.gizmo.y = -this.child.height / 2;
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.width = this.initialWidth + (event.data.global.x - this.initialX);
        this.child.height = this.initialHeight + (this.initialY - event.data.global.y);

        this.calculateXY(event, 'corner');
    }
}

export class BottomLeftGizmo extends Gizmo {
    resetPosition(): void {
        this.gizmo.x = -this.child.width / 2;
        this.gizmo.y = this.child.height / 2;
    }
    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.width = this.initialWidth - (event.data.global.x - this.initialX);
        this.child.height = this.initialHeight - (this.initialY - event.data.global.y);

        this.calculateXY(event, 'corner');
    }
}

export class BottomRightGizmo extends Gizmo {
    resetPosition(): void {
        this.gizmo.x = +this.child.width / 2;
        this.gizmo.y = this.child.height / 2;
    }

    onGizmoMove(event: PIXI.InteractionEvent): void {
        this.child.width = this.initialWidth + (event.data.global.x - this.initialX);
        this.child.height = this.initialHeight - (this.initialY - event.data.global.y);
        this.calculateXY(event, 'corner');
    }
}

export class RotateGizmo extends Gizmo {

    private interactionEvent: InteractionEvent;
    resetPosition(): void {
        this.gizmo.x = 0;

        if (this.child.height < 0) {
            this.gizmo.y = 40 - this.childRectangle.height / 2;
        } else {
            this.gizmo.y = -40 - this.childRectangle.height / 2;
        }

    }

    onGizmoMove(event: InteractionEvent): void {
        this.interactionEvent = event;

        this.moveTool.mainContainer.angle = this.calculateAngle(event);
        this.child.angle = this.calculateAngle(event);
    }

    onGizmoStart(event: InteractionEvent): void {
    }

    onGizmoEnd(): void {
    }

    private calculateAngle(event: InteractionEvent): number {
        const p1 = {
            x: event.data.global.x,
            y: event.data.global.y,
        };

        const p2 = {
            x: this.child.x,
            y: this.child.y
        };

        const angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        return angleDeg - (this.child.height < 0 ? -90 : 90);
    }
}


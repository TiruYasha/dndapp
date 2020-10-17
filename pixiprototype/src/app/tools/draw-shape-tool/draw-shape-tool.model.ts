import { Container, Graphics, InteractionEvent } from 'pixi.js';
import { Rectangle } from 'src/app/pixi-objects/rectangle.model';
import { ShapePixiObject } from 'src/app/pixi-objects/shape.model';
import { Playground } from 'src/app/pixi-structure/playground.model';
import { Tool, ToolOptions } from '../tool.model';
import { DrawShapeToolOptions, DrawShapeType } from './draw-shape-options.model';

export class DrawShapeTool extends Tool {
    private options: DrawShapeToolOptions;
    private shape: ShapePixiObject;

    private dragging: boolean;
    private initialX = 0;
    private initialY = 0;

    constructor(playground: Playground) {
        super(playground);

        this.options = {
            color: 0xffffff,
            fill: true,
            shape: DrawShapeType.Rectangle
        };
    }

    get shapeContainer(): Graphics { return this.shape.displayObject as Graphics; }

    pointerDown = (event: InteractionEvent) => {
        this.setupShape();
        this.initialX = event.data.global.x;
        this.initialY = event.data.global.y;
        this.dragging = true;
        this.shapeContainer.visible = true;
        this.playground.activeLayer.addObject(this.shape);
    }

    dragEnd = () => {
        this.dragging = false;
    }

    pointerMove = (event: InteractionEvent) => {
        if (this.dragging) {
            const differenceX = this.initialX - event.data.global.x;
            const differenceY = this.initialY - event.data.global.y;

            this.shapeContainer.width = differenceX;
            this.shapeContainer.height = differenceY;
            this.shapeContainer.x = event.data.global.x + (this.shapeContainer.width / 2);
            this.shapeContainer.y = event.data.global.y + (this.shapeContainer.height / 2);
        }
    }

    enable(): void {
        this.playground.backgroundLayer.layer.on('pointerdown', this.pointerDown)
            .on('pointerup', this.dragEnd)
            .on('pointerupoutside', this.dragEnd)
            .on('pointermove', this.pointerMove);
    }

    disable(): void {
        this.playground.backgroundLayer.layer.off('pointerdown', this.pointerDown)
            .off('pointerup', () => this.dragEnd)
            .off('pointerupoutside', () => this.dragEnd)
            .off('pointermove', this.pointerMove);
    }
    activeLayerDisabled(): void {
        // throw new Error('Method not implemented.');
    }
    newActiveLayerEnabled(): void {
        //throw new Error('Method not implemented.');
    }

    setOptions(options: ToolOptions): void {
    }

    private setupShape(): void {
        if (this.options.shape === DrawShapeType.Rectangle) {
            const rectangle = new Rectangle({
                height: 2,
                width: 2,
                x: 0,
                y: 0,
                lineStyle: {
                    color: this.options.color,
                    width: 1,
                    alpha: 1
                },
                fillColor: this.options.fill ? {
                    colorInHex: this.options.color
                } : undefined
            },
                this.playground.activeLayer.layer);
            this.shape = rectangle;
        }
    }
}

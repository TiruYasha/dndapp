import { Container, Graphics, InteractionEvent } from 'pixi.js';
import { Playground } from '../../pixi-structure/playground.model';
import { Tool } from '../tool.model';
import { ToolType } from '../tool.type';

export class MultiSelectorTool extends Tool {

    private dragging = false;
    private initialX = 0;
    private initialY = 0;

    private selection!: Graphics;

    constructor(playground: Playground) {
        super(playground, ToolType.Selector);
    }

    pointerDown = (event: InteractionEvent) => {
        this.initialX = event.data.global.x;
        this.initialY = event.data.global.y;
        this.dragging = true;
        this.selection.visible = true;
    }

    dragEnd = () => {
        this.selection.visible = false;
        this.dragging = false;
        this.selection.width = 0;
        this.selection.width = 0;
    }

    pointerMove = (event: InteractionEvent) => {
        if (this.dragging) {
            const differenceX = this.initialX - event.data.global.x;
            const differenceY = this.initialY - event.data.global.y;

            this.selection.width = differenceX;
            this.selection.height = differenceY;
            this.selection.x = event.data.global.x;
            this.selection.y = event.data.global.y;
        }
    }

    enable(): void {
        this.selection = new Graphics();
        this.selection.visible = false;

        this.selection.beginFill(0x1c9dff, 0.5);
        this.selection.drawRect(0, 0, 10, 10);
        this.selection.endFill();
        this.playground.toolsLayer.container.addChild(this.selection);

        this.playground.backgroundLayer.container.on('pointerdown', this.pointerDown)
            .on('pointerup', this.dragEnd)
            .on('pointerupoutside', this.dragEnd)
            .on('pointermove', this.pointerMove);
    }

    disable(): void {
        this.playground.toolsLayer.container.removeChild(this.selection);
        this.playground.backgroundLayer.container.off('pointerdown', this.pointerDown)
            .off('pointerup', () => this.dragEnd)
            .off('pointerupoutside', () => this.dragEnd)
            .off('pointermove', this.pointerMove);
    }
}

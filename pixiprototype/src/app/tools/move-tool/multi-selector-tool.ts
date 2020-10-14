import { Container, Graphics, InteractionEvent } from 'pixi.js';

export class MultiSelectorTool {
    private dragging: boolean;
    private initialX = 0;
    private initialY = 0;

    private selection: Graphics;

    constructor(private background: Container, private toolsLayer: Container) {
        this.background.interactive = true;

        this.selection = new Graphics();
        this.selection.visible = false;
        this.selection.beginFill(0x1c9dff, 0.5);
        this.selection.drawRect(0, 0, 700, 600);
        this.selection.endFill();
        this.toolsLayer.addChild(this.selection);

        const rectangle = new Graphics();
        rectangle.beginFill(0xffffff, 1);
        rectangle.drawRect(0, 0, 700, 600);
        rectangle.endFill();
        rectangle.alpha = 0.0;
        this.background.addChild(rectangle);

        this.background.on('pointerdown', (event: InteractionEvent) => {
            this.initialX = event.data.global.x;
            this.initialY = event.data.global.y;
            this.dragging = true;
            this.selection.visible = true;

        })
            .on('pointerup', () => this.dragEnd())
            .on('pointerupoutside', () => this.dragEnd())
            .on('pointermove', (event: InteractionEvent) => {
                if (this.dragging) {
                    const differenceX = this.initialX - event.data.global.x;
                    const differenceY = this.initialY - event.data.global.y;

                    this.selection.width = differenceX;
                    this.selection.height = differenceY;
                    this.selection.x = event.data.global.x;
                    this.selection.y = event.data.global.y;
                }

            });
    }

    dragEnd(): void {
        this.selection.visible = false;
        this.dragging = false;
        this.selection.width = 0;
        this.selection.width = 0;
    }
}

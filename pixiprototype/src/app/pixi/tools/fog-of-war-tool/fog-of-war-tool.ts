import { autoDetectRenderer, BLEND_MODES, Container, filters, Graphics, InteractionEvent, RenderTexture, SCALE_MODES, Sprite } from 'pixi.js';
import { Layer } from '../../pixi-structure/layer.model';
import { Playground } from '../../pixi-structure/playground.model';
import { Tool } from '../tool.model';
import { ToolType } from '../tool.type';

export class FogOfWarTool extends Tool {
    private layer: Layer;
    private layerName = 'FogOfWarLower';
    private fog: Graphics;
    private maskTexture: RenderTexture;

    private dragging: boolean;
    private initialX = 0;
    private initialY = 0;
    private selection: Graphics;
    private rectangleReveal = new Graphics();

    constructor(playground: Playground) {
        super(playground, ToolType.FogOfWar);
    }

    enable(): void {
        this.layer = this.playground.getLayer(this.layerName);
    }
    disable(): void {
    }
    activeLayerDisabled(): void {
    }
    newActiveLayerEnabled(): void {
    }

    fillMap(): void {
        // const brush = new Graphics();
        // brush.beginFill(0xffffff);
        // brush.drawCircle(0, 0, 100);
        // brush.endFill();
        this.layer = new Layer(this.layerName, 99999);
        this.layer.container.filters = [new filters.AlphaFilter()];
        this.playground.addLayer(this.layer);

        this.fog = new Graphics();
        this.fog.beginFill(0x000000, 0.5);
        this.fog.lineStyle(0);
        this.fog.drawRect(0, 0, 500, 500);
        this.fog.endFill();

        const texture = this.playground.app.renderer.generateTexture(this.fog, SCALE_MODES.NEAREST, 1);
        const upper = new Sprite(texture);
        this.layer.container.addChild(upper);
        upper.width = this.playground.app.screen.width;
        upper.height = this.playground.app.screen.height;

        this.maskTexture = RenderTexture.create({
            width: this.playground.app.screen.width,
            height: this.playground.app.screen.height
        });

        const maskSprite = new Sprite(this.maskTexture);
        this.layer.container.addChild(maskSprite);
        maskSprite.blendMode = BLEND_MODES.DST_OUT;

        // brush.position.copyFrom(event.data.global);
        // app.renderer.render(brush, maskTexture, false, null, false);
    }

    clearFog(): void {
        this.playground.deleteLayer(this.layer);
    }

    enableRectangleReveal(): void {
        this.rectangleReveal = new Graphics();
        this.rectangleReveal.beginFill(0xffffff);
        this.rectangleReveal.drawRect(0, 0, 20, 20);
        this.rectangleReveal.endFill();
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

    pointerDown = (event: InteractionEvent) => {
        this.initialX = event.data.global.x;
        this.initialY = event.data.global.y;
        this.dragging = true;
        this.selection.visible = true;
    }

    dragEnd = () => {
        this.rectangleReveal.position.set(this.selection.x, this.selection.y);
        this.rectangleReveal.width = this.selection.width;
        this.rectangleReveal.height = this.selection.height;

        this.playground.app.renderer.render(this.rectangleReveal, this.maskTexture, false, null, false);

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

}

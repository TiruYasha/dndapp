import { autoDetectRenderer, BLEND_MODES, Container, filters, Graphics, RenderTexture, SCALE_MODES, Sprite } from 'pixi.js';
import { Layer } from '../../pixi-structure/layer.model';
import { Playground } from '../../pixi-structure/playground.model';
import { Tool } from '../tool.model';
import { ToolType } from '../tool.type';

export class FogOfWarTool extends Tool {
    private layer: Layer;
    private container: Layer;
    private upper: Sprite;
    private layerName = 'FogOfWarLower';
    private layerNameContainer = 'FogOfWarContainer';

    private fog: Graphics;

    maskTexture;

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
        const brush = new Graphics();
        brush.beginFill(0xffffff);
        brush.drawCircle(0, 0, 100);
        brush.endFill();
        const containerLayer = new Layer(this.layerName, 99999999);
        containerLayer.layer.filters = [new filters.AlphaFilter()];
        this.playground.addLayer(containerLayer);

        const gr = new Graphics();
        gr.beginFill(0x000000);
        gr.lineStyle(0);
        gr.drawRect(0, 0, 500, 500);
        gr.endFill();
        const texture = this.playground.app.renderer.generateTexture(gr, SCALE_MODES.NEAREST, 1);
        const upper = new Sprite(texture);
        containerLayer.layer.addChild(upper);
        upper.width = this.playground.app.screen.width;
        upper.height = this.playground.app.screen.height;

        this.maskTexture = RenderTexture.create({
            width: this.playground.app.screen.width,
            height: this.playground.app.screen.height
        });

        const maskSprite = new Sprite(this.maskTexture);
        containerLayer.layer.addChild(maskSprite);
        maskSprite.blendMode = BLEND_MODES.DST_OUT;

        brush.position.set(50, 50);
        this.playground.app.renderer.render(brush, this.maskTexture, false, null, false);
    }

    clearFog(): void {

    }
}

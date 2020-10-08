import { Layer } from './layer.model';
import { Application } from 'pixi.js';
import { MoveTool } from '../tools/move-tool/move-tool';

export class Playground {
    private _layers: Layer[] = [];

    constructor(private app: Application) {
        const layer = this.addLayer('tools', 9999999);
        const moveTool = new MoveTool(layer.layer);
        this.addLayer('default', 0);
    }

    addLayer(name: string, order: number): Layer {
        const layer = new Layer(name, order, this.app.stage.width, this.app.stage.height);
        this._layers.push(layer);

        this.app.stage.addChild(layer.layer);
        this.app.stage.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex);
        return layer;
    }

    get layers(): Layer[] {
        return this._layers;
    }
}

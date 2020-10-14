import { Layer } from './layer.model';
import { Application } from 'pixi.js';
import { ToolType } from '../tools/tool.type';
import { Tool } from '../tools/tool.model';
import { createTool } from '../tools/tool-factory.model';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export class Playground {
    private layersSubject = new ReplaySubject<Layer[]>(1);
    private activeLayerSubject = new ReplaySubject<Layer>(1);

    private _layers: Layer[] = [];
    private _backgroundLayer: Layer;
    private _toolsLayer: Layer;
    private _activeLayer: Layer;

    private _activeTool: Tool;

    layers$ = this.layersSubject.asObservable();
    activeLayer$ = this.activeLayerSubject.asObservable();

    constructor(private app: Application) {
        this._backgroundLayer = this.addLayer('background', -9999999);
        this.addLayer('default', 0);
        this.createToolsLayer();
    }

    get layers(): Layer[] {
        return this._layers;
    }

    get toolsLayer(): Layer { return this._toolsLayer; }

    get backgroundLayer(): Layer { return this._backgroundLayer; }

    get activeLayer(): Layer { return this._activeLayer; }

    addLayer(name: string, order: number): Layer {
        const layer = new Layer(name, order, this.app.stage.width, this.app.stage.height);
        this._layers.push(layer);

        this.app.stage.addChild(layer.layer);
        this.app.stage.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex);
        this.layers.sort((itemA, itemB) => itemA.layer.zIndex - itemB.layer.zIndex);
        this.layersSubject.next(this._layers);

        return layer;
    }

    getLayer(name: string): Layer {
        return this._layers.filter(l => l.name === name)[0];
    }

    setActiveTool(toolType: ToolType): void {
        if (this._activeTool) {
            this._activeTool.disable();
        }

        this._activeTool = createTool(toolType, this);
        this._activeTool.enable();
    }

    setActiveLayer(layer: Layer): void {
        this._activeTool?.activeLayerDisabled();
        this._activeLayer = layer;
        this.activeLayerSubject.next(this._activeLayer);
        this._activeTool?.newActiveLayerEnabled();
    }

    private createToolsLayer(): void {
        this._toolsLayer = this.addLayer('tools', 9999999);
        this._toolsLayer.layer.width = this.app.view.width;
        this._toolsLayer.layer.height = this.app.view.height;
        // const multiSelectTool = new MultiSelectorTool(this.backgroundLayer.layer, layer.layer);
        // const moveTool = new MoveTool(layer.layer);
    }
}

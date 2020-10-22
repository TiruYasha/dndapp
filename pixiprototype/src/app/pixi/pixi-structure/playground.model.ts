import { Layer } from './layer.model';
import { Application, Graphics } from 'pixi.js';
import { ToolType } from '../tools/tool.type';
import { Tool } from '../tools/tool.model';
import { createTool } from '../tools/tool-factory.model';
import { ReplaySubject } from 'rxjs';

export class Playground {
    private layersSubject = new ReplaySubject<Layer[]>(1);
    private activeLayerSubject = new ReplaySubject<Layer>(1);
    private activeToolSubject = new ReplaySubject<Tool>(1);

    private _layers: Layer[] = [];
    private _backgroundLayer: Layer;
    private _toolsLayer: Layer;
    private _activeLayer: Layer;

    private _activeTool: Tool;

    layers$ = this.layersSubject.asObservable();
    activeLayer$ = this.activeLayerSubject.asObservable();
    activeTool$ = this.activeToolSubject.asObservable();

    constructor(public app: Application) {
        this.createBackground();
        this.addLayerQuick('default', 0);
        this.createToolsLayer();
    }

    get layers(): Layer[] {
        return this._layers;
    }

    get toolsLayer(): Layer { return this._toolsLayer; }

    get backgroundLayer(): Layer { return this._backgroundLayer; }

    get activeLayer(): Layer { return this._activeLayer; }

    get width(): number { return this.app.view.width; }
    get height(): number { return this.app.view.height; }

    addLayerQuick(name: string, order: number): Layer {
        const layer = new Layer(name, order);
        this.addLayer(layer);

        return layer;
    }

    addLayer(layer: Layer): Layer {
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
        this.activeToolSubject.next(this._activeTool);
    }

    setActiveLayer(layer: Layer): void {
        this._activeTool?.activeLayerDisabled();
        this._activeLayer = layer;
        this.activeLayerSubject.next(this._activeLayer);
        this._activeTool?.newActiveLayerEnabled();
    }

    private createBackground(): void {
        this._backgroundLayer = this.addLayerQuick('background', -9999999);
        const backgroundRectangle = new Graphics();
        backgroundRectangle.beginFill(0xffffff, 1);
        backgroundRectangle.drawRect(0, 0, 700, 600);
        backgroundRectangle.endFill();
        backgroundRectangle.alpha = 0.0;
        this.backgroundLayer.layer.addChild(backgroundRectangle);
        this._backgroundLayer.makeInteractable();
    }

    private createToolsLayer(): void {
        this._toolsLayer = this.addLayerQuick('tools', 9999999);
        this._toolsLayer.layer.width = this.app.view.width;
        this._toolsLayer.layer.height = this.app.view.height;
    }
}

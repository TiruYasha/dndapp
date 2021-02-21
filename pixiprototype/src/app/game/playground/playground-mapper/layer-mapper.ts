import { Injectable } from '@angular/core';
import { Layer } from '../../pixi/pixi-structure/layer.model';
import { Playground } from '../../pixi/pixi-structure/playground.model';
import { LayerModel } from '../../_hubs/models/shared/layer.model';
import { CanvasObjectMapper } from './canvas-object-mapper';

@Injectable({
    providedIn: 'root'
})
export class LayerMapper {

    constructor(private pixiObjectMapper: CanvasObjectMapper) { }

    addLayers(playground: Playground, layers: LayerModel[]): void {
        layers.forEach(l => {
            const layer = new Layer(l.id, l.name, l.order);
            playground.addLayer(layer);
            this.pixiObjectMapper.addCanvasObjectsToLayer(layer, l.canvasObjects);
        });
    }
}

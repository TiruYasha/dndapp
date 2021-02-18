import { LayerModel } from './layer.model';

export class PlaygroundModel {
    name = '';
    layers: LayerModel[];
    isPlayerView = false;
    constructor() {
        this.layers = [];
    }
}

import { LayerModel } from './layer.model';

export class PlaygroundModel {
    id = '';
    name = '';
    layers: LayerModel[];
    isPlayerView = false;
    constructor() {
        this.layers = [];
    }
}

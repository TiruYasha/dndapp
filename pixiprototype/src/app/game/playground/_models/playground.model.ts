import { LayerModel } from './layer.model';

export class PlaygroundModel {
    name: string;
    layers: LayerModel[];
    isPlayerView: boolean;
    constructor() {
        this.layers = [];
    }
}

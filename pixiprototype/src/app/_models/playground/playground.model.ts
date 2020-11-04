import { LayerModel } from './layer.model';

export class PlaygroundModel {
    name: string;
    layers: LayerModel[];

    constructor() {
        this.layers = [];
    }
}

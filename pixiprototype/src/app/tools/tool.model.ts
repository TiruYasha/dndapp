import { Layer } from '../pixi-structure/layer.model';
import { Playground } from '../pixi-structure/playground.model';

export abstract class Tool {
    constructor(protected playground: Playground) {

    }

    abstract enable(): void;

    abstract disable(): void;

    abstract activeLayerDisabled(): void;
    abstract newActiveLayerEnabled(): void;
}

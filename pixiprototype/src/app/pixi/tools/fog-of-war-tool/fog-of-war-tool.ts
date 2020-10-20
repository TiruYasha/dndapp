import { Layer } from '../../pixi-structure/layer.model';
import { Playground } from '../../pixi-structure/playground.model';
import { Tool } from '../tool.model';
import { ToolType } from '../tool.type';

export class FogOfWarTool extends Tool {
    constructor(playground: Playground) {
        super(playground, ToolType.FogOfWar);
    }

    enable(): void {
    }
    disable(): void {
    }
    activeLayerDisabled(): void {
    }
    newActiveLayerEnabled(): void {
    }

    fillMap(): void {
        this.playground.addLayer('FogOfWar', 9999998);
    }
}

import { Playground } from '../pixi-structure/playground.model';
import { ToolType } from './tool.type';

export abstract class Tool {
    constructor(protected playground: Playground, public type: ToolType) {

    }

    abstract enable(): void;

    abstract disable(): void;
}

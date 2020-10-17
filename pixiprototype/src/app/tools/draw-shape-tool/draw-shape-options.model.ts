import { Circle } from 'pixi.js';
import { ToolOptions } from '../tool.model';

export interface DrawShapeToolOptions extends ToolOptions {
    shape: DrawShapeType;
    color: number;
    fill: boolean;
}

export enum DrawShapeType {
    Rectangle,
    Circle
}

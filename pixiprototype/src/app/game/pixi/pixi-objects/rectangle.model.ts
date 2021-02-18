import { Container, Graphics } from 'pixi.js';
import { BaseOptions as BasePixiObjectOptions } from './base-pixi-object.model';
import { ShapePixiObject } from './shape.model';

export class Rectangle extends ShapePixiObject {
    rectangle: Graphics;

    constructor(id: string, options: RectangleOptions) {
        const rectangle = new Graphics();

        if (options.fillColor) {
            rectangle.beginFill(options.fillColor.colorInHex);
        }

        rectangle.drawRect(0, 0, options.width, options.height);

        if (options.fillColor) {
            rectangle.endFill();
        }

        rectangle.pivot.x = options.width / 2;
        rectangle.pivot.y = options.height / 2;

        super(id, rectangle, options);

        this.rectangle = rectangle;
    }
}

export class RectangleOptions extends BasePixiObjectOptions {
    height = 0;
    width = 0;
    lineStyle?: LineStyle;
    fillColor?: FillColor;
}

export class LineStyle {
    width?: number;
    color?: number;
    alpha?: number;
    alignment?: number;
    native?: boolean;
}

export class FillColor {
    colorInHex = 0x00000;
    alpha?: number;
}

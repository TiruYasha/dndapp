import { Container, DisplayObject, Graphics } from 'pixi.js';
import { BaseOptions as BasePixiObjectOptions, BasePixiObject } from './base-pixi-object.model';
import { ClickableObject } from './clickable-pixi-object.model';

export class Rectangle extends ClickableObject {
    rectangle: Graphics;

    constructor(options: RectangleOptions, parent: Container) {
        const rectangle = new Graphics();
        rectangle.lineStyle(options.lineStyle.width, options.lineStyle.color, options.lineStyle.alpha);

        if (options.fillColor) {
            rectangle.beginFill(options.fillColor.colorInHex);
        }

        rectangle.drawRect(0, 0, options.width, options.height);

        if (options.fillColor) {
            rectangle.endFill();
        }

        rectangle.pivot.x = options.width / 2;
        rectangle.pivot.y = options.height / 2;

        super(rectangle, options, parent);

        this.rectangle = rectangle;
    }
}

export class RectangleOptions extends BasePixiObjectOptions {
    height: number;
    width: number;
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
    colorInHex: number;
    alpha?: number;
}


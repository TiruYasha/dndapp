import { Container, Graphics } from 'pixi.js';

export function createContainer(): Container {
    const container = new Container();

    container.width = 4;
    container.height = 4;
    container.visible = false;
    container.interactive = true;
    container.buttonMode = true;
    container.zIndex = 9999999;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    return container;
}

export function createRectangle(): Graphics {
    const rectangle = new Graphics();
    rectangle.beginFill(0x1c9dff, 1);
    rectangle.drawRect(0, 0, 4, 4);
    rectangle.endFill();
    rectangle.pivot.x = rectangle.width / 2;
    rectangle.pivot.y = rectangle.height / 2;
    rectangle.interactive = true;
    rectangle.buttonMode = true;
    rectangle.alpha = 0.0;

    return rectangle;
}

export function createGizmo(): Graphics {
    const gizmo = new Graphics();
    gizmo.beginFill(0x1c9dff);
    gizmo.drawRect(0, 0, 20, 20);
    gizmo.endFill();
    gizmo.pivot.x = gizmo.width / 2;
    gizmo.pivot.y = gizmo.height / 2;
    gizmo.visible = true;
    gizmo.interactive = true;
    gizmo.buttonMode = true;

    return gizmo;
}

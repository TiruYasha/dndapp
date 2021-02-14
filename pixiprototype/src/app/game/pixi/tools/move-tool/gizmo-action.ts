import { Container, InteractionEvent } from 'pixi.js';
import { GizmoType } from './gizmo.type';

export function gizmoResize(
    gizmoSide: GizmoType,
    interactionEvent: InteractionEvent,
    child: Container,
    initialWidth: number,
    initialChildX: number,
    initialX: number): void {
    if (gizmoSide === GizmoType.Left) { leftGizmoResize(interactionEvent, child, initialWidth, initialChildX, initialX); }
}

function leftGizmoResize(
    interactionEvent: InteractionEvent,
    child: Container,
    initialWidth: number,
    initialChildX: number,
    initialX: number) {
    child.width = initialWidth - (interactionEvent.data.global.x - initialX);
    child.x = initialChildX + ((interactionEvent.data.global.x - initialX) / 2);
}

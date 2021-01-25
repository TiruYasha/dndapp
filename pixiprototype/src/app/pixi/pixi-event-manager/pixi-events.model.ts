export type PixiEvent = PlaygroundEvents | ObjectEvents;

export enum PlaygroundEvents {
    LayerSwitched,
}

export enum ObjectEvents {
    ObjectSelected,
    ObjectMoved
}

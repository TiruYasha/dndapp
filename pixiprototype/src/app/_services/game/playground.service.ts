import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'pixi.js';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BasePixiObject } from 'src/app/pixi/pixi-objects/base-pixi-object.model';
import { Rectangle } from 'src/app/pixi/pixi-objects/rectangle.model';
import { Layer } from 'src/app/pixi/pixi-structure/layer.model';
import { Playground } from 'src/app/pixi/pixi-structure/playground.model';
import { ObjectHub } from 'src/app/_hubs/object/object.hub';
import { CanvasObject } from 'src/app/_models/playground/canvas-objects/canvas-object.model';
import { CanvasObjectType } from 'src/app/_models/playground/canvas-objects/canvas-object.type';
import { RectangleModel } from 'src/app/_models/playground/canvas-objects/rectangle.model';
import { PlaygroundModel } from 'src/app/_models/playground/playground.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {
    private _playground: Playground;
    private playgroundSubject: ReplaySubject<Playground>;
    private playgroundCache$: Observable<Playground>;

    _playground$: Observable<Playground>;

    constructor(
        private http: HttpClient) {
        this.playgroundSubject = new ReplaySubject<Playground>(1);
        this._playground$ = this.playgroundSubject.asObservable();
    }

    get playground$(): Observable<Playground> { return this._playground$; }

    get playground(): Playground { return this._playground; }

    loadPlayground(): Observable<Playground> {
        if (!this.playgroundCache$) {
            this.playgroundCache$ = this.http.get<PlaygroundModel>(`${environment.gameApi}playground`)
                .pipe(map(p => {
                    const app = new Application({ width: 700, height: 600, backgroundColor: 0xffffff });
                    app.stage.width = 700;
                    app.stage.height = 600;

                    this._playground = new Playground(app);
                    this.addLayers(p);

                    return this._playground;
                }));

            this.playgroundCache$.subscribe(p => {
                this.playgroundSubject.next(p);
            });
        }
        return this.playgroundSubject.asObservable();
    }

    private addLayers(p: PlaygroundModel): void {
        p.layers.forEach(l => {
            const layer = new Layer(l.id, l.name, l.order);
            this._playground.addLayer(layer);
            this.addCanvasObjectsToLayer(layer, l.canvasObjects);
        });
    }

    private addCanvasObjectsToLayer(layer: Layer, canvasObjects: CanvasObject[]): void {
        canvasObjects.forEach(c => {
            let pixiObject: BasePixiObject;
            if (c.type === CanvasObjectType.Rectangle) {
                pixiObject = this.createRectangle(c as RectangleModel);
            }
            layer.addObject(pixiObject);
        });
    }

    private createRectangle(r: RectangleModel): BasePixiObject {
        const rectangle = new Rectangle(r.id, {
            height: r.height,
            width: r.width,
            x: r.x,
            y: r.y,
            fillColor: {
                colorInHex: r.colorInHex
            }
        });

        return rectangle;
    }

}

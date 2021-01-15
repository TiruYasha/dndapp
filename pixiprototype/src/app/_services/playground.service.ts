import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'pixi.js';
import { AttachSession } from 'protractor/built/driverProviders';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BasePixiObject } from '../pixi/pixi-objects/base-pixi-object.model';
import { Rectangle } from '../pixi/pixi-objects/rectangle.model';
import { Layer } from '../pixi/pixi-structure/layer.model';
import { Playground } from '../pixi/pixi-structure/playground.model';
import { Tool } from '../pixi/tools/tool.model';
import { ToolType } from '../pixi/tools/tool.type';
import { CanvasObject } from '../_models/playground/canvas-objects/canvas-object.model';
import { CanvasObjectType } from '../_models/playground/canvas-objects/canvas-object.type';
import { RectangleModel } from '../_models/playground/canvas-objects/rectangle.model';
import { PlaygroundModel } from '../_models/playground/playground.model';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {
    private _playground: Playground;
    private playgroundSubject: ReplaySubject<Playground>;
    private playgroundCache$: Observable<Playground>;

    _playground$: Observable<Playground>;

    constructor(private http: HttpClient) {
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
            const layer = new Layer(l.name, l.order);
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
        const rectangle = new Rectangle({
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

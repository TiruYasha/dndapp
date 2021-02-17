import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from 'pixi.js';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BasePixiObject } from 'src/app/game/pixi/pixi-objects/base-pixi-object.model';
import { Rectangle } from 'src/app/game/pixi/pixi-objects/rectangle.model';
import { Layer } from 'src/app/game/pixi/pixi-structure/layer.model';
import { Playground } from 'src/app/game/pixi/pixi-structure/playground.model';
import { CanvasObject } from 'src/app/game/playground/_models/canvas-objects/canvas-object.model';
import { CanvasObjectType } from 'src/app/game/playground/_models/canvas-objects/canvas-object.type';
import { RectangleModel } from 'src/app/game/playground/_models/canvas-objects/rectangle.model';
import { PlaygroundModel } from 'src/app/game/playground/_models/playground.model';
import { environment } from 'src/environments/environment';
import { GameHub } from '../../_hubs/game.hub';
import { PlaygroundListItem } from '../_models/playground-list-item.model';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {

    private _playground: Playground;
    private destroySubject = new Subject();
    private playgroundSubject: ReplaySubject<Playground>;
    private playgroundCache$: Observable<Playground>;

    private _playground$: Observable<Playground>;

    constructor(
        private http: HttpClient) {
        this.playgroundSubject = new ReplaySubject<Playground>(1);
        this._playground$ = this.playgroundSubject.asObservable();
    }

    get playground$(): Observable<Playground> { return this._playground$; }

    get playground(): Playground { return this._playground; }

    changePlayground(playgroundId: string): Observable<Playground> {
        this.destroySubject.next();
        this.playgroundCache$ = this.http.get<PlaygroundModel>(`${environment.gameApi}playground/${playgroundId}`)
            .pipe(
                takeUntil(this.destroySubject),
                map(p => {
                    return this.mapPlayground(p);
                }));

        this.playgroundCache$.subscribe(p => {
            this.playgroundSubject.next(p);
        });

        return this.playgroundSubject.asObservable();
    }

    getPlaygrounds(): Observable<PlaygroundListItem[]> {
        return this.http.get<PlaygroundListItem[]>(`${environment.gameApi}playground`);
    }

    private mapPlayground(p: PlaygroundModel): Playground {
        if (this.playground) {
            this.playground.dispose();
        }

        const app = new Application({ width: 700, height: 600, backgroundColor: 0xffffff });
        app.stage.width = 700;
        app.stage.height = 600;

        this._playground = new Playground(app);
        this.addLayers(p);

        return this._playground;
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

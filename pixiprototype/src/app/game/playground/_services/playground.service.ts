import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Playground } from 'src/app/game/pixi/pixi-structure/playground.model';
import { PlaygroundModel } from 'src/app/game/playground/_models/playground.model';
import { environment } from 'src/environments/environment';
import { GameHub } from '../../_hubs/game.hub';
import { PlaygroundMapper } from '../playground-mapper/playground-mapper';
import { ConnectToPlayground } from '../_hub-models/comands/connect-to-playground.model';
import { PlaygroundListItem } from '../_models/playground-list-item.model';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {
    private destroySubject = new Subject();
    private _playground!: Playground;
    private playgroundSubject: ReplaySubject<Playground>;
    private playgroundCache$!: Observable<Playground>;

    playground$: Observable<Playground>;

    constructor(
        private http: HttpClient,
        private playgroundMapper: PlaygroundMapper,
        private gamehub: GameHub) {
        this.playgroundSubject = new ReplaySubject<Playground>(1);
        this.playground$ = this.playgroundSubject.asObservable();
    }

    get playground(): Playground { return this._playground; }

    changePlayground(playgroundId: string): void {
        this.destroySubject.next();
        this.playgroundCache$ = this.http.get<PlaygroundModel>(`${environment.gameApi}playground/${playgroundId}`)
            .pipe(
                takeUntil(this.destroySubject),
                map(p => {
                    return this.playgroundMapper.MapPlayground(p);
                }));

        this.playgroundCache$
            .pipe(takeUntil(this.destroySubject))
            .subscribe(p => {
                const connectToPlayground: ConnectToPlayground = {
                    playgroundId,
                    oldPlaygroundId: this.playground?.id
                };
                console.log(connectToPlayground);
                this.gamehub.send('ConnectToPlayground', connectToPlayground);
                this.setPlayground(p);
            });
    }

    getPlaygrounds(): Observable<PlaygroundListItem[]> {
        return this.http.get<PlaygroundListItem[]>(`${environment.gameApi}playground`);
    }

    private setPlayground(playground: Playground): void {
        this._playground = playground;
        this.playgroundSubject.next(playground);
    }
}

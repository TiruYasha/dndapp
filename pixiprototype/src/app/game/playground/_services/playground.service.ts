import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Playground } from 'src/app/game/pixi/pixi-structure/playground.model';
import { PlaygroundModel } from 'src/app/game/_hubs/models/shared/playground.model';
import { environment } from 'src/environments/environment';
import { Hub } from '../../_hubs/hub';
import { PlaygroundMapper } from '../playground-mapper/playground-mapper';
import { ConnectToPlayground } from '../../_hubs/models/commands/connect-to-playground.model';
import { PlaygroundListItem } from '../../_hubs/models/shared/playground-list-item.model';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {
    private _playground!: Playground;
    private playgroundSubject: ReplaySubject<Playground>;

    playground$: Observable<Playground>;

    constructor(
        private http: HttpClient,
        private playgroundMapper: PlaygroundMapper,
        private hub: Hub
    ) {
        this.playgroundSubject = new ReplaySubject<Playground>(1);
        this.playground$ = this.playgroundSubject.asObservable();
    }

    get playground(): Playground { return this._playground; }

    changePlayground(playgroundModel: PlaygroundModel): void {
        const playground = this.playgroundMapper.MapPlayground(playgroundModel);

        this.setPlayground(playground);
    }

    connectToPlayground(playgroundId: string): void {
        const connectToPlayground: ConnectToPlayground = {
            playgroundId,
            oldPlaygroundId: this.playground?.id
        };
        this.hub.send('ConnectToPlayground', connectToPlayground);
    }

    getPlaygrounds(): Observable<PlaygroundListItem[]> {
        return this.http.get<PlaygroundListItem[]>(`${environment.gameApi}playground`);
    }

    private setPlayground(playground: Playground): void {
        this._playground = playground;
        this.playgroundSubject.next(playground);
    }
}

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ReplaySubject } from 'rxjs';
import { Hub } from 'src/app/_helpers/hub';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GameHub {
    private hub: Hub;
    private hubSubject = new ReplaySubject<Hub>(1);

    hub$ = this.hubSubject.asObservable();

    constructor() {
    }

    start(): void {
        const hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.gameApi}hub/game?access_token=${this.getAccessToken()}`)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hub = new Hub(hubConnection);
        this.hub.start()
            .then(c => this.hubSubject.next(this.hub));
    }

    private getAccessToken(): string {
        return localStorage.getItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84');
    }
}

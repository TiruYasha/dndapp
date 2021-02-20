import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ReplaySubject } from 'rxjs';
import { Hub } from 'src/app/_helpers/hub';
import { environment } from 'src/environments/environment';
import { HubMethod } from '../playground/_hub-models/method.model';

@Injectable({
    providedIn: 'root'
})
export class GameHub {
    private hubSubject = new ReplaySubject<Hub>(1);

    hub!: Hub;
    hub$ = this.hubSubject.asObservable();

    constructor() {
    }

    on<T>(methodName: string, callback: (data: HubMethod<T>) => any): void {
        this.hub.on(methodName, callback);
    }

    send<T>(methodName: string, data: T): void {
        this.hub.send(methodName, data);
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
        const token = localStorage.getItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84');

        return token ? token : '';
    }
}

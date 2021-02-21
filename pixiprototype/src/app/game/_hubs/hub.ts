import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { HubCommand, HubMethod } from './models/method.model';

@Injectable({
    providedIn: 'root'
})
export class Hub {
    private connection!: HubConnection;
    constructor() {

    }

    start(): Promise<void> {
        this.connection = new HubConnectionBuilder()
            .withUrl(`${environment.gameApi}hub/game?access_token=${this.getAccessToken()}`)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        return this.connection.start();
    }

    on<T>(methodName: string, callback: (data: HubMethod<T>) => any): void {
        this.connection.on(methodName, callback);
    }

    send<T>(methodName: string, data: T): void {
        const contentWithMetaData: HubCommand<T> = {
            data
        };
        this.connection.send(methodName, contentWithMetaData);
    }

    private getAccessToken(): string {
        const token = localStorage.getItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84');

        return token ? token : '';
    }
}

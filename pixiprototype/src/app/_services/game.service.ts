import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private hubConnection: HubConnection;

    constructor() {
        this.buildConnection();
        this.startConnection();
    }
    
    startConnection(): void {
        this.hubConnection.start()
            .then(() => console.log('Connection Started'))
            .catch(err => {
                console.log('Error while starting connection: ' + err);
            });
    }

    buildConnection(): void {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.gameApi}gamehub?access_token=${this.getAccessToken()}`)
            .build();
    }

    private getAccessToken(): string {
        return localStorage.getItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84');
    }
}

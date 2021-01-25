import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Hub } from '../_helpers/hub';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor() { }

  buildConnection(hubName: string): Hub {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.gameApi}${hubName}?access_token=${this.getAccessToken()}`)
      .build();
      
    return new Hub(hubConnection);
  }

  private getAccessToken(): string {
    return localStorage.getItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84');
  }
}

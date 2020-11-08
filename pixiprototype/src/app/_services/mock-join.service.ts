import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MockJoinService {

    currentGameId = '';

    constructor(private http: HttpClient) {

    }

    joinGame(userId: string, gameId: string): Observable<any> {
        this.currentGameId = '9a747b4b-5ce4-428b-8abe-af56ca738c84';
        return this.http.post(`${environment.gameApi}games/${gameId}/join`, {
            playerId: userId
        });
    }
}

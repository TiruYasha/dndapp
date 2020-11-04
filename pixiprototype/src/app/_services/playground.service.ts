import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlaygroundModel } from '../_models/playground/playground.model';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {

    constructor(private http: HttpClient) {

    }

    getPlayground(): Observable<PlaygroundModel> {
        return this.http.get<PlaygroundModel>(`${environment.gameApi}playground`);
    }
}

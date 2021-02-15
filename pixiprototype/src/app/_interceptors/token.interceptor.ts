import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders(
            {
                Authorization: 'Bearer ' + localStorage.getItem('gameToken9a747b4b-5ce4-428b-8abe-af56ca738c84')
            });
        req = req.clone({
            headers
        });
        return next.handle(req);
    }
}

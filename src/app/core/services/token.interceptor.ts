import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private loginService: LoginService;

    constructor(inj: Injector) {
        setTimeout(() => {
            this.loginService = inj.get(LoginService);
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                // Authorization: 'Bearer bTA5NDg1QGNvbGxhYYXR0LmNvbTpjYnVzTVNAMjAxNw==',
                // Authorization: 'Basic bTA5NDg1QGNvbGxhYYXR0LmNvbTpjYnVzTVNAMjAxNw==',
                Authorization: this.loginService.token,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });

        return next.handle(request);
    }
}

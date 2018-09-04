import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {LoginService} from './login.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private loginService: LoginService;

    constructor(inj: Injector, loginService: LoginService) {
        this.loginService = loginService;
        /*setTimeout(() => {
            this.loginService = inj.get(LoginService);
        });*/
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

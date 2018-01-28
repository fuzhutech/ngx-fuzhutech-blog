import {
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpEventType
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    status = {
        'status.400': '错误的请求。由于语法错误，该请求无法完成。',
        'status.401': '未经授权。服务器拒绝响应。',
        'status.403': '已禁止。服务器拒绝响应。',
        'status.404': '未找到。无法找到请求的位置。',
        'status.405': '方法不被允许。使用该位置不支持的请求方法进行了请求。',
        'status.406': '不可接受。服务器只生成客户端不接受的响应。',
        'status.407': '需要代理身份验证。客户端必须先使用代理对自身进行身份验证。',
        'status.408': '请求超时。等待请求的服务器超时。',
        'status.409': '冲突。由于请求中的冲突，无法完成该请求。',
        'status.410': '过期。请求页不再可用。',
        'status.411': '长度必需。未定义“内容长度”。',
        'status.412': '前提条件不满足。请求中给定的前提条件由服务器评估为 false。',
        'status.413': '请求实体太大。服务器不会接受请求，因为请求实体太大。',
        'status.414': '请求 URI 太长。服务器不会接受该请求，因为 URL 太长。',
        'status.415': '不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。',
        'status.416': 'HTTP 状态代码 {0}',
        'status.500': '内部服务器错误。',
        'status.501': '未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。',
        'status.503': '服务不可用。服务器当前不可用(过载或故障)。'
    };

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*req = req.clone({
            url: 'test',
            setHeaders: {
                Authorization: null
            }
        });*/

        return next.handle(req)
            .mergeMap(event => {
                // 只会在请求成功才会返回一个 HttpResponse 类型，因此，我们可以大胆判断是否来源于 HttpResponse 来表示HTTP请求已经成功。
                if (event instanceof HttpResponse) {
                    console.log('HTTP请求已经成功', req.url);
                }
                // 统一对业务层级的错误 code !== 0 产生一个错误信号的 Observable。反之，产生一个成功的信息。
                if (event instanceof HttpResponse && event.body.code && event.body.code !== 0) {
                    console.log('HTTP请求已经成功但发生业务层级错误', req.url);
                    return Observable.create(observer => observer.error(event));
                }

                return Observable.create(observer => observer.next(event));
            })
            .catch(err => {
                // Http请求失败。前面的 switchMap 所产生的错误信号，也会在这里被捕获到。

                if (err instanceof HttpErrorResponse) {
                    console.log('捕获错误，HTTP请求失败');
                    const res = err as HttpErrorResponse;
                    switch (res.status) {
                        case 401:
                            // 权限处理
                            location.href = ''; // 重新登录
                            break;
                        case 200:
                            // 业务层级错误处理
                            // this.notifySrv.error('业务错误', `错误代码为：${res.body.code}`);
                            break;
                        case 404:
                            // this.notifySrv.error('404', `API不存在`);
                            break;
                    }
                } else if (err instanceof Error) {
                    console.log('捕获错误,前端发生错误');
                }

                if (err instanceof HttpResponse) {
                    console.log('捕获错误，HTTP请求已经成功但发生业务层级错误');
                }

                console.log(err);
                // 以错误的形式结束本次请求
                return Observable.throw(err);
            });
    }

    /*longRequest() {
        const request = new HttpRequest(
            'POST', '/api/test-request', {},
            {reportProgress: true});

        this.http.request(request)
            .subscribe(
                event => {
                    if (event.type === HttpEventType.DownloadProgress) {
                        console.log('Download progress event', event);
                    }
                    if (event.type === HttpEventType.UploadProgress) {
                        console.log('Upload progress event', event);
                    }
                    if (event.type === HttpEventType.Response) {
                        console.log('response received...', event.body);
                    }
                }
            );
    }*/
}


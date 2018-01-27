import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {BaseService} from './base-service';

@Injectable()
export class CommentService extends BaseService {

  constructor(protected _http: HttpClient) {
    super(_http, 'comments');
  }

  getListByWhere(postId) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json;charset=UTF-8')
      .append('Authorization', this.token);

    const searchParams = new HttpParams().set('postId', postId);

    return this.http.get(this.url, {params: searchParams, headers: headers});
  }

}

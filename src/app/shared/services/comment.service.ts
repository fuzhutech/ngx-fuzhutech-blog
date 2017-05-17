import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {BaseService} from './base-service';

@Injectable()
export class CommentService extends BaseService {

  constructor(protected _http: Http) {
    super(_http, 'comments');
  }

  getListByWhere(postId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', this.token);

    const searchParams = new URLSearchParams();
    searchParams.set('postId', postId);

    return this.http.get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

}

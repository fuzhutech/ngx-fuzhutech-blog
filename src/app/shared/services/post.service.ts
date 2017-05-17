import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';

import {BaseService} from './base-service';


@Injectable()
export class PostService extends BaseService {

  constructor(protected http: Http) {
    super(http, 'posts');
  }

  public getItemAndRead(id: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', this.token);

    const searchParams = new URLSearchParams();
    searchParams.set('read', '1');

    return this.http.get(this.url + '/' + id, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

}

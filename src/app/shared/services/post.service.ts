import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {BaseService} from './base-service';


@Injectable()
export class PostService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http, 'posts');
  }

  /*public getItemAndRead(id: number) {
   const headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json;charset=UTF-8');
   // headers.append('Content-Type', 'application/x-www-form-urlencoded');
   headers.append('Authorization', this.token);

   const searchParams = new HttpParams();
   searchParams.set('read', '1');

   return this.http.get(this.url + '/' + id, {params: searchParams, headers: headers})
   .map(response => response.json());
   }*/

  public updateReadCount(data) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);

    return this.http.put(this.url + '/updateIncreaseCount', JSON.stringify(data), {headers: headers});
  }

}

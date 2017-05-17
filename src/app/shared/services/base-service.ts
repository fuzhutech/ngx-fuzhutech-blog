import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {isUndefined} from 'util';
import {HOST_API_PATH, HOST_PATH} from '../constant';
import {LoginService, User} from '../index';

export abstract class BaseService {

  protected http: Http;
  protected url: string;
  private host = HOST_PATH;
  private host_api = HOST_API_PATH;

  constructor(http: Http, path: string) {
    this.http = http;
    this.url = this.host_api + '/' + path;
  }

  public get currentUser(): User {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }

  public get token(): string {
    if (this.currentUser != null) {
      return this.currentUser.password;
    } else {
      return null;
    }
  }

  public getItem(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', this.token);
    const searchParams = new URLSearchParams();

    console.log(this.currentUser);

    return this.http.get(this.url + '/' + id, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  public getList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Authorization', this.token);

    const searchParams = new URLSearchParams();

    return this.http.get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  public getListByPageInfo(offset, rows, total) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Authorization', this.token);

    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset);
    searchParams.set('rows', rows);
    searchParams.set('total', total);

    return this.http.get(this.url + '/page', {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  public create(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);

    return this.http.post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  public edit(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);

    return this.http.put(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  public delete(id) {
    if (id) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.token);

      return this.http.delete(this.url + '/' + id, {headers: headers})
        .map(res => res.json());
    }
  }

}

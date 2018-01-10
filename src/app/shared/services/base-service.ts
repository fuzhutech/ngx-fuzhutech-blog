import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {isUndefined} from 'util';
import {HOST_API_PATH, HOST_PATH} from '../constant';
import {User} from '../index';

export abstract class BaseService {

  protected http: HttpClient;
  protected url: string;
  private host = HOST_PATH;
  private host_api = HOST_API_PATH;

  constructor(http: HttpClient, path: string) {
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
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', this.token);
    const searchParams = new HttpParams();

    console.log(this.currentUser);

    return this.http.get(this.url + '/' + id, {params: searchParams, headers: headers});
  }

  public getList() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Authorization', this.token);

    const searchParams = new HttpParams();

    return this.http.get(this.url, {params: searchParams, headers: headers});
  }

  public getListByPageInfo(offset, rows, total) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Authorization', this.token);

    const searchParams = new HttpParams();
    searchParams.set('offset', offset);
    searchParams.set('rows', rows);
    searchParams.set('total', total);

    return this.http.get(this.url + '/page', {params: searchParams, headers: headers});
  }

  public create(data) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);

    return this.http.post(this.url, JSON.stringify(data), {headers: headers});
  }

  public edit(data) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);

    return this.http.put(this.url, JSON.stringify(data), {headers: headers});
  }

  public delete(id) {
    if (id) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.token);

      return this.http.delete(this.url + '/' + id, {headers: headers});
    }
  }

}

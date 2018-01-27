import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {isUndefined} from 'util';
import {HOST_API_PATH, HOST_PATH} from '../../shared/constant';
import {User} from '../../shared/index';

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
      return '';
    }
  }

  public getItem(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    return this.http.get(this.url + '/' + id, {headers: headers});
  }

  public getList() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json;charset=UTF-8')
      .append('Authorization', this.token);

    const searchParams = new HttpParams();

    return this.http.get(this.url, {params: searchParams, headers: headers});
  }

  public getListByPageInfo(offset, rows, total) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Authorization', this.token);

    // 每当调用 set() 方法，将会返回包含新值的 HttpParams 对象
    const searchParams = new HttpParams()
      .set('offset', offset)
      .set('rows', rows)
      .set('total', total);

    return this.http.get(this.url + '/page', {params: searchParams, headers: headers});
  }

  public create(data) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.token);

    return this.http.post(this.url, JSON.stringify(data), {headers: headers});
  }

  public edit(data) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.token);

    return this.http.put(this.url, JSON.stringify(data), {headers: headers});
  }

  public delete(id) {
    if (id) {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', this.token);

      return this.http.delete(this.url + '/' + id, {headers: headers});
    }
  }

}

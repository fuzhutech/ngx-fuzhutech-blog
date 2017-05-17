import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {HOST_API_PATH, HOST_PATH} from '../constant';


@Injectable()
export class SiteStatService {
  private host = HOST_PATH;
  private host_api = HOST_API_PATH;
  protected url: string = this.host_api + '/statistics';

  constructor(protected http: Http) {
    //
  }

  public getSiteStat() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();

    return this.http.get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

}

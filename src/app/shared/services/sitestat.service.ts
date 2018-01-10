import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HOST_API_PATH, HOST_PATH} from '../constant';


@Injectable()
export class SiteStatService {
  private host = HOST_PATH;
  private host_api = HOST_API_PATH;
  protected url: string = this.host_api + '/statistics';

  constructor(protected http: HttpClient) {
    //
  }

  public getSiteStat() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new HttpParams();

    return this.http.get(this.url, {params: searchParams, headers: headers});
  }

}

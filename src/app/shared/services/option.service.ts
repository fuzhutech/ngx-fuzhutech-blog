import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Option} from '../../shared/model/option-model';
import {BaseService} from './base-service';

@Injectable()
export class OptionService extends BaseService {

  constructor(protected http: Http) {
    super(http, 'options');
  }

}

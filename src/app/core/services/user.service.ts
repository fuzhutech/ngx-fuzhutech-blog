import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {BaseService} from './base-service';

@Injectable()
export class UserService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http, 'users');
  }

}

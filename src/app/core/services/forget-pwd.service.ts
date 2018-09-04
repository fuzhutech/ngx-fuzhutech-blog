import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ForgetPwdService {

  constructor(public http: HttpClient) {
  }

}

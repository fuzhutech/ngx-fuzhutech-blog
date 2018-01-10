import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import {User} from '../model/user-model';
import {HOST_API_PATH} from '../constant';

@Injectable()
export class LoginService {

  private host_api = HOST_API_PATH;
  private user: User;

  constructor(public http: HttpClient) {
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

  public login(user: User) {

    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    user.password = Md5.hashStr(user.password).toString();
    console.log(user.password);

    return this.http.put(this.host_api + '/login', JSON.stringify(user), {headers: headers})
      .map((obj: { status, data }) => {
        if (obj.status === 1) {
          user = obj.data;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return obj;
      });
  }

  public logout(): void {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.token);

    this.http.put(this.host_api + '/logout', JSON.stringify(this.currentUser), {headers: headers})
      .subscribe(
        data => {
          console.log('退出当前用户');
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('refresh Complete');
        });


    localStorage.removeItem('currentUser');
  }
}

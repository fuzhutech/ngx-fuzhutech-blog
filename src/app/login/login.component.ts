import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../shared';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';

import {User} from '../shared/model/user-model';
import {fadeIn} from '../shared/animations/fade-in';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public error: Error;

  constructor(public router: Router,
              public location: Location,
              public activatedRoute: ActivatedRoute,
              public userLoginService: LoginService) {
    console.log(this.userLoginService);
  }

  ngOnInit() {
    //
  }

  public doLogin(): void {
    this.userLoginService.login(this.user).subscribe(
      (data: { status, data, message }) => {
        if (data.status === 1) {
          this.location.back();
        } else {
          this.error = data.message;
        }
      },
      err => {
        console.log(err);
      });
  }

  public doLogout(): void {
    this.userLoginService.logout();
    this.router.navigateByUrl('');
  }

  public forgetPwd(): void {
    this.router.navigateByUrl('forgetpwd');
  }
}

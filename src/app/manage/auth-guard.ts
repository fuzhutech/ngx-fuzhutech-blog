import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../shared';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              public loginService: LoginService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //进行验证是否已经登录
    if (this.loginService.currentUser) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

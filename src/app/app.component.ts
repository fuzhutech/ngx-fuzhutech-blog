import {Component} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/merge';
import {LoginService} from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router,
              public loginService: LoginService) {
  }

  getCurrentUser() {
    return this.loginService.currentUser;
  }

  toggle(button: any) {
    console.log(button);
  }

  public doLogin(): void {
    this.router.navigateByUrl('login');
  }

  public doLogout(): void {
    console.log('doLogout');
    this.loginService.logout();
    this.router.navigateByUrl('home');
  }
}

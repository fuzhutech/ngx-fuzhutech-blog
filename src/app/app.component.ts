import {Component, HostListener, ElementRef, Renderer, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/merge';
import {LoginService} from './shared';
// import {RegisterService} from './register/register.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public currentUser: User;
  private globalClickCallbackFn: Function;
  private loginSuccessCallbackFn: Function;

  constructor(public elementRef: ElementRef,
              public renderer: Renderer,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public loginService: LoginService,
              public vcr: ViewContainerRef,
              public location: Location) {
  }

  getCurrentUser() {
    return this.loginService.currentUser;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toggle(button: any) {
    console.log(button);
  }

  public doLogout(): void {
    console.log('doLogout');
    this.loginService.logout();
    this.router.navigateByUrl('home');
  }
}

import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    @Output() toggleDarkTheme = new EventEmitter<boolean>();

    constructor(public router: Router, public loginService: LoginService) {
    }

    ngOnInit() {
    }

    onChange(checked: boolean) {
        this.toggleDarkTheme.emit(checked);
    }

    doLogout() {
        this.loginService.logout();
        this.router.navigateByUrl('home').catch(err => console.log(err));
    }

    onHomeClick() {
        this.router.navigate(['']).catch(err => console.log(err));
    }

    doLogin() {
        this.router.navigateByUrl('login').catch(err => console.log(err));
    }


}

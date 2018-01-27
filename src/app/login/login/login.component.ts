import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {LoginService} from '../../core/services/login.service';
import {Location} from '@angular/common';

import {fadeIn} from '../../shared/animations/fade-in';

@Component({
    selector: 'app-user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeIn]
})
export class LoginComponent implements OnInit {
    public error: Error;
    pic = '/assets/imgs/quotes/0.jpg';

    form: FormGroup;

    constructor(private fb: FormBuilder,
                public location: Location,
                public userLoginService: LoginService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            loginName: ['admin', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });

        this.pic = `/assets/imgs/quotes/${(Math.random() * 9).toFixed()}.jpg`;
    }

    onSubmit({value, valid}, ev: Event) {
        ev.preventDefault();
        if (!valid) {
            return;
        }

        // noinspection JSIgnoredPromiseFromCall
        this.userLoginService.login(value)
            .take(1)
            .subscribe(
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
}

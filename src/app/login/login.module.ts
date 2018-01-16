import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {ForgetPwdComponent} from './forget-password/forget-pwd.component';

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent,
        ForgetPwdComponent,
    ]
})
export class LoginModule {
}

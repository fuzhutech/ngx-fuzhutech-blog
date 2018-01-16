import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgetPwdComponent} from './forget-password/forget-pwd.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgetpwd', component: ForgetPwdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}

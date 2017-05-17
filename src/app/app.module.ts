import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';
import {LoginComponent, ForgetPwdComponent} from './login';


import {appRoutes} from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, ForgetPwdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}

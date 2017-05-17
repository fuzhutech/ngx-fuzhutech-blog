import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomDatePipe} from './directives/custom-date.directive';
import {EscapeHtmlPipe} from './directives/safe-html.directive';
import {BooleanPipe} from './directives/boolean-pipe';
import {LoginService, ForgetPwdService, PostService, CommentService, UserService, OptionService, SiteStatService} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CustomDatePipe,
    EscapeHtmlPipe,
    BooleanPipe
  ],
  providers: [
    LoginService,
    ForgetPwdService,
    PostService,
    CommentService,
    UserService,
    OptionService,
    SiteStatService
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomDatePipe,
    EscapeHtmlPipe,
    BooleanPipe
  ]
})

export class SharedModule {

}

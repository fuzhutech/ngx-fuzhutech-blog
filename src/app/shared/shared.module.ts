import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
} from '@angular/material';

import {CustomDatePipe} from './directives/custom-date.directive';
import {EscapeHtmlPipe} from './directives/safe-html.directive';
import {BooleanPipe} from './directives/boolean-pipe';
import {
    LoginService,
    ForgetPwdService,
    PostService,
    CommentService,
    UserService,
    OptionService,
    SiteStatService
} from './index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTableModule,
        MatToolbarModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTableModule,
        MatToolbarModule,
        CustomDatePipe,
        EscapeHtmlPipe,
        BooleanPipe
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
    ]
})

export class SharedModule {

}

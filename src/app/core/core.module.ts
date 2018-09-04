import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SkipSelf, Optional} from '@angular/core';

import 'hammerjs';

import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {
    CommentService,
    ForgetPwdService,
    LoginService,
    OptionService,
    PostService,
    SiteStatService,
    UserService
} from './services';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/token.interceptor';
import {ErrorInterceptor} from './services/error.interceptor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    providers: [
        {
            provide: 'BASE_CONFIG',
            useValue: {
                uri: 'http://localhost:3000'
            }
        },
        LoginService,
        ForgetPwdService,
        PostService,
        CommentService,
        UserService,
        OptionService,
        SiteStatService,
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule/*, ir: MatIconRegistry, ds: DomSanitizer*/) {
        if (parent) {
            throw new Error('模块已经存在，不能再次加载!');
        }

        // loadSvgResource(ir, ds);
    }

    /*static forRoot(config: UserServiceConfig): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {provide: UserServiceConfig, useValue: config }
            ]
        };
    }*/
}

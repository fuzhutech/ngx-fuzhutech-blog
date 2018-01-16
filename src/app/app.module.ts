import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';


import {appRoutes} from './app.routes';
import {CoreModule} from './core/core.module';
import {OverlayContainer, FullscreenOverlayContainer} from '@angular/cdk/overlay';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        CoreModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports: [],
    providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
    bootstrap: [AppComponent]
})
export class AppModule {

}

import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    darkTheme = false;

    constructor(private overlayContainer: OverlayContainer) {
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;
        if (dark) {
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
        }
    }
}

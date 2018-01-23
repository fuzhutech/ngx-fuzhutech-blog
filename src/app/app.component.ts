import {Component, HostBinding, Version, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    darkTheme = false;

    @HostBinding('class') componentCssClass = 'myapp-light-theme';

    constructor(private overlayContainer: OverlayContainer) {
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;
        if (dark) {
            this.componentCssClass = 'myapp-dark-theme';
            /**
             * 由于某些组件（如菜单、选择、对话框等）在一个全局覆盖容器中，这些组件需要受主题CSS类选择器的影响,
             * 需要额外的步骤将全局样式类添加到全局覆盖容器中。
             */
            this.overlayContainer.getContainerElement().classList.remove('myapp-light-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            this.componentCssClass = 'myapp-light-theme';
            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-light-theme');
        }
    }

}

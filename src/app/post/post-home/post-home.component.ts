import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {flyIn} from '../../shared/animations/fly-in';

@Component({
    selector: 'app-post-home',
    templateUrl: './post-home.component.html',
    styleUrls: ['./post-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        flyIn
    ]
})
export class PostHomeComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}

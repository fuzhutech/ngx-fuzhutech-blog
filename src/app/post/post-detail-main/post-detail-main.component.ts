import {Component, OnInit} from '@angular/core';
import {flyIn} from '../../shared/animations/fly-in';

@Component({
  selector: 'app-post-detail-main',
  templateUrl: './post-detail-main.component.html',
  styleUrls: ['./post-detail-main.component.css'],
  animations: [
    flyIn
  ]
})
export class PostDetailMainComponent {

}

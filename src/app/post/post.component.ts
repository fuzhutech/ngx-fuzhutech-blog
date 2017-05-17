import {Component, OnInit} from '@angular/core';
import {flyIn} from '../shared/animations/fly-in';

@Component({
  selector: 'app-home',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
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

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {Post} from '../../shared/model/post-model';
import {PostService} from '../../shared';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public post: Post = new Post();

  constructor(public postService: PostService,
              public activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => this.getPost(params['postId'])
    );
  }

  public getPost(id: number) {
    this.postService.getItem(id)
      .subscribe(
        data => this.post = data,
        error => console.error(error)
      );
  }
}

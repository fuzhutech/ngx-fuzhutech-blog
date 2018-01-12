import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {CommentService} from '../../shared';
import {Comment} from '../../shared/model/comment-model';

import {LoginService} from '../../shared';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  public comments: Array<Comment>;
  comment: Comment;
  private postId: number;

  constructor(private activeRoute: ActivatedRoute,
              private commentService: CommentService,
              private loginService: LoginService) {
    this.comment = new Comment();
  }

  ngOnInit() {
    // 根据路由参数刷新评论列表
    this.activeRoute.params.subscribe(
      params => {
        this.postId = params['postId'];
        if (this.postId) {
          this.getCommentList(this.postId);
        }
      }
    );

  }

  public getCommentList(postId: number) {
    this.commentService.getListByWhere(postId).subscribe(
      data => {
        this.comments = data as Comment[];
      },
      err => {
        console.log(err);
      }
    );
  }

  addComment() {
    // 添加评论
    this.comment.postId = this.postId;

    if (this.loginService.currentUser && this.loginService.currentUser.id) {
      this.comment.userId = this.loginService.currentUser.id;
    }

    this.commentService.create(this.comment).subscribe(
      data => {
        // 添加成功

        this.comment = new Comment();
        this.getCommentList(this.postId);
      },
      err => {
        console.log(err);
      }
    );
  }
}

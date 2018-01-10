import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {flyIn} from '../../shared/animations/fly-in';
import {ActivatedRoute} from '@angular/router';

import {Post} from '../../shared/model/post-model';
import {PostService, LoginService, User} from '../../shared';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css'],
  animations: [
    flyIn
  ]
})

export class WritePostComponent implements OnInit {
  private ueditor: any;
  public alerts: any = [];
  post: Post = new Post();

  constructor(public route: ActivatedRoute,
              public service: PostService,
              private loginService: LoginService,
              private sanitizer: DomSanitizer) {
    //
  }

  ngOnInit() {
    const postId: number = this.route.snapshot.params['postId'];

    if (postId != null) {
      this.service.getItem(postId).subscribe(
        data => {
          this.post = data as Post;
        },
        err => {
          console.log(err);
        });
    }
  }

  save() {
    if (this.post.id) {
      // 编辑
      this.edit();
    } else {
      // 新增
      this.add();
    }
  }

  add() {
    const currentUser: User = this.loginService.currentUser;
    this.post.categoryId = 1;
    this.post.userId = currentUser.id;
    this.post.userName = currentUser.loginName;
    this.post.nickName = currentUser.nickName;

    this.service.create(this.post).subscribe(
      data => {
        this.alerts.push({
          type: 'info',
          msg: `添加成功`,
          timeout: 5000
        });
      },
      err => {
        this.alerts.push({
          type: 'info',
          msg: '添加失败:' + err,
          timeout: 5000
        });
      }
    );
  }

  edit() {
    this.service.edit(this.post).subscribe(
      data => {
        this.alerts.push({
          type: 'info',
          msg: `保存成功`,
          timeout: 5000
        });
      },
      err => {
        this.alerts.push({
          type: 'info',
          msg: '保存失败:' + err,
          timeout: 5000
        });
      }
    );
  }

}

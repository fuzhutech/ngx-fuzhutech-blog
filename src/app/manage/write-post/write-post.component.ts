import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {flyIn} from '../../shared/animations/fly-in';
import {ActivatedRoute} from '@angular/router';

import {Post} from '../../shared/model/post-model';
import {PostService, LoginService, User} from '../../shared';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-write-post',
    templateUrl: './write-post.component.html',
    styleUrls: ['./write-post.component.scss'],
    animations: [
        flyIn
    ]
})

export class WritePostComponent implements OnInit {
    private ueditor: any;
    post: Post = new Post();
    message: string;

    constructor(public route: ActivatedRoute,
                public service: PostService,
                private loginService: LoginService,
                private sanitizer: DomSanitizer,
                public snackBar: MatSnackBar) {
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
                this.openSnackBar('添加成功', 'info');
            },
            err => {
                this.message = err;
                this.openSnackBar('添加失败:' + err, 'warn');
            }
        );
    }

    edit() {
        this.service.edit(this.post).subscribe(
            data => {
                this.openSnackBar('保存成功', 'info');
            },
            err => {
                this.message = err;
                this.openSnackBar('保存失败:' + err, 'warn');
            }
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

}

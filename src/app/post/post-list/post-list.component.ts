import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {PageEvent} from '@angular/material';
import {Post} from '../../shared/model/post-model';
import {HOST_PATH} from '../../shared';


import {PostService} from '../../core/services';

@Component({
    selector: 'app-postlist',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostlistComponent implements OnInit, AfterViewInit {
    private postUrl = HOST_PATH + '/p/';

    totalItems: number; // 总记录数
    pageSize = 5;
    postList: Array<Post>;


    constructor(public router: Router,
                public activeRoute: ActivatedRoute,
                public service: PostService) {

    }

    ngOnInit() {
        //
    }

    ngAfterViewInit(): void {
        this.loadData(0, this.pageSize, -1);
    }

    private loadData(offset: number, rows: number, total: number) {
        this.service.getListByPageInfo(offset, rows, -1).subscribe(
            (data: { rows, total }) => {
                this.postList = data.rows;
                this.totalItems = data.total;
            },
            err => {
                console.error(err);
            }
        );
    }

    pageChanged(event: PageEvent): void {
        const offset = (event.pageIndex) * event.pageSize;
        const rows = event.pageSize;

        this.loadData(offset, rows, -1);
    }

    toggleExpand(post: Post) {
        console.log('toggleExpand0');
        post.toggle_expand = true;

        this.service.getItem(post.id).subscribe(
            (data: { content }) => {
                post.content = data.content;
            },
            error => {
                post.content = '获取内容失败:' + error;
            }
        );

        this.updateReadCount(post);
    }

    updateReadCount(post: Post) {

        post.readCount = post.readCount + 1;

        const record: Post = new Post();
        record.id = post.id;
        record.title = post.title;
        record.readCount = 1;

        this.service.updateReadCount(record).subscribe(
            data => {

            },
            err => {
                console.log('更新文章阅读量失败:' + err);
            });
    }

}

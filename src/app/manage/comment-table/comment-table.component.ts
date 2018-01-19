import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {flyIn} from '../../shared/animations/fly-in';
import {Comment} from '../../shared/model/comment-model';
import {CommentService} from '../../shared';

import {MatTableDataSource, MatPaginator} from '@angular/material';
import {ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-comment-table',
    templateUrl: './comment-table.component.html',
    styleUrls: ['./comment-table.component.scss'],
    animations: [
        flyIn
    ]
})
export class CommentTableComponent implements OnInit {

    displayedColumns = ['id', 'content', 'userName', 'createTime', 'action'];
    dataSource = new MatTableDataSource<Comment>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public router: Router,
                public activeRoute: ActivatedRoute,
                public commentService: CommentService) {

    }

    ngOnInit() {
        this.loadData();
    }

    delComment(comment: Comment): void {
        console.log(comment);
        this.commentService.delete(comment.id)
            .take(1)
            .subscribe(
                data => {
                    this.loadData();
                },
                (httpErrorResponse: HttpErrorResponse) => {
                    console.log(httpErrorResponse.error);
                }
            );

    }

    private loadData() {

        this.commentService.getList()
            .take(1)
            .subscribe(
                (data: Comment[]) => {
                    this.dataSource.data = data;
                },
                err => {
                    console.log(err);
                }
            );
    }

}

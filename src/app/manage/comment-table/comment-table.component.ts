import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource, MatPaginator} from '@angular/material';

import {CommentService} from '../../core/services';
import {Comment} from '../../shared/model/comment-model';
import {flyIn} from '../../shared/animations/fly-in';
import {take} from "rxjs/operators";

@Component({
    selector: 'app-comment-table',
    templateUrl: './comment-table.component.html',
    styleUrls: ['./comment-table.component.scss'],
    animations: [
        flyIn
    ]
})
export class CommentTableComponent implements OnInit, AfterViewInit {

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
            .pipe(take(1))
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
            .pipe(take(1))
            .subscribe(
                (data: Comment[]) => {
                    this.dataSource.data = data;
                },
                err => {
                    console.log(err);
                }
            );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}

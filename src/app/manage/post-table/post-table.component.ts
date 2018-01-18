import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {flyIn} from '../../shared/animations/fly-in';
import {ActivatedRoute, Router, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment} from '@angular/router';
import {PostService} from '../../shared';
import {Post} from '../../shared/model/post-model';

import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {ViewChild} from '@angular/core';

@Component({
    selector: 'app-post-table',
    templateUrl: './post-table.component.html',
    styleUrls: ['./post-table.component.scss'],
    animations: [
        flyIn
    ]
})
export class PostTableComponent implements OnInit, AfterViewInit {
    displayedColumns = ['id', 'title', 'userName', 'customDate', 'select'];
    dataSource = new MatTableDataSource<Post>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public router: Router,
                public activeRoute: ActivatedRoute,
                public postService: PostService) {
    }

    ngOnInit() {
        this.loadData();
    }


    public loadData() {

        this.postService.getList()
            .take(1)
            .subscribe(
                (data: Post[]) => {
                    this.dataSource.data = data;
                },
                err => {
                    console.log(err);
                }
            );
    }


    public goToWrite(): void {
        this.router.navigateByUrl('manage/write');
    }

    public editPost(post): void {
        this.router.navigateByUrl('manage/p/' + post.id + '/edit');
    }

    public top(post: Post): void {
        this.postService.edit(post).subscribe();
    }

    public unTop(post: Post): void {
        this.postService.edit(post).subscribe();
    }

    public delPost(post: Post): void {

        this.postService.delete(post.id).subscribe(
            data => {
                this.loadData();
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

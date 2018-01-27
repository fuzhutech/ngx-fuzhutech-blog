import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource, MatPaginator} from '@angular/material';

import {flyIn} from '../../shared/animations/fly-in';
import {User} from '../../shared/model/user-model';
import {UserService} from '../../core/services';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    animations: [
        flyIn
    ]
})
export class UserTableComponent implements OnInit, AfterViewInit {

    displayedColumns = ['id', 'loginName', 'nickName', 'createTime', 'action'];
    dataSource = new MatTableDataSource<User>();

    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(public router: Router,
                public activeRoute: ActivatedRoute,
                public userService: UserService) {
    }

    ngOnInit() {
        this.loadData();
    }


    private loadData() {

        this.userService.getList().subscribe(
            (data: User[]) => {
                this.dataSource.data = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    public newUser(): void {
        this.router.navigateByUrl('manage/users/create');
    }

    public blockUser(user): void {
        console.log(user);
    }

    public unBlockUser(user): void {
        console.log(user);
    }

    public resetPwd(user): void {
        console.log(user);
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

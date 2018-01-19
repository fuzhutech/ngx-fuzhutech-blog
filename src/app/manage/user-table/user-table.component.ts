import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {flyIn} from '../../shared/animations/fly-in';
import {UserService} from '../../shared';
import {User} from '../../shared/model/user-model';

import {MatTableDataSource, MatPaginator} from '@angular/material';
import {ViewChild} from '@angular/core';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    animations: [
        flyIn
    ]
})
export class UserTableComponent implements OnInit {

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
}

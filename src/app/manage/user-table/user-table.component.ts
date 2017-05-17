import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {flyIn} from '../../shared/animations/fly-in';
import {UserService} from '../../shared';
import {User} from '../../shared/model/user-model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  animations: [
    flyIn
  ]
})
export class UserTableComponent implements OnInit {
  public maxSize = 5;
  public itemsPerPage = 5;
  public totalItems = 15;
  public currentPage = 1;
  public numPages;

  public userList: Array<User>;

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public userService: UserService) {
  }

  ngOnInit() {
    /*this.activeRoute.params.subscribe(
     params => this.getUsersByPage(params["page"])
     );*/

    const offset = (this.currentPage - 1) * this.itemsPerPage;
    // const end = (this.currentPage) * this.itemsPerPage;
    const rows = this.itemsPerPage;
    const total = -1;

    this.loadData(offset, rows, total);
  }

  public pageChanged(event): void {
    // this.router.navigateByUrl("manage/usertable/page/" + event.page);

    const offset = (event.page - 1) * event.itemsPerPage;
    const rows = event.itemsPerPage;

    this.loadData(offset, rows, -1);
  }

  public loadData(offset: number, rows: number, total: number) {

    this.userService.getListByPageInfo(offset, rows, -1).subscribe(
      data => {
        this.userList = data.rows;
        this.totalItems = data.total;
      },
      err => {
        console.log(err);
      }
    );
  }

  public newUser(): void {
    this.router.navigateByUrl('manage/users/create');
  }

  public blockUser(userId: Number): void {
    console.log(userId);
  }

  public unBlockUser(userId: Number): void {
    console.log(userId);
  }

  public resetPwd(userId: Number): void {
    console.log(userId);
  }
}

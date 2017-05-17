import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment} from '@angular/router';
import {flyIn} from '../../shared/animations/fly-in';
import {Comment} from '../../shared/model/comment-model';
import {CommentService} from '../../shared';

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.css'],
  animations: [
    flyIn
  ]
})
export class CommentTableComponent implements OnInit {
  public maxSize = 5;
  public itemsPerPage = 5;
  public totalItems = 15;
  public currentPage = 1;
  public numPages;

  public commentList: Array<Comment>;

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public commentService: CommentService) {

  }

  ngOnInit() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const rows = this.itemsPerPage;
    const total = -1;

    this.loadData(offset, rows, total);
  }

  public loadData(offset: number, rows: number, total: number) {

    this.commentService.getListByPageInfo(offset, rows, -1).subscribe(
      data => {
        this.commentList = data.rows;
        this.totalItems = data.total;
      },
      err => {
        console.log(err);
      }
    );
  }

  public pageChanged(event: any): void {
    const offset = (event.page - 1) * event.itemsPerPage;
    const rows = event.itemsPerPage;

    this.loadData(offset, rows, -1);
  }

  public delComment(comment: Comment): void {
    //console.log(comment.id);
    this.commentService.delete(comment.id).subscribe(
      data => {
        const offset = (this.currentPage - 1) * this.itemsPerPage;
        const rows = this.itemsPerPage;
        const total = -1;

        this.loadData(offset, rows, total);
      },
      err => {
        console.log(err);
      }
    )

  }
}

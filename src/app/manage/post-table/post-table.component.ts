import {Component, OnInit, Input} from '@angular/core';
import {flyIn} from '../../shared/animations/fly-in';
import {ActivatedRoute, Router, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment} from '@angular/router';
import {PostService} from '../../shared';
import {Post} from '../../shared/model/post-model';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss'],
  animations: [
    flyIn
  ]
})
export class PostTableComponent implements OnInit {
  @Input() dataURL = 'src/mock-data/post-list-mock.json';

  public postList: Array<Post>;
  public maxSize = 5;
  public itemsPerPage = 5;
  public totalItems = 15;
  public currentPage = 1;
  public numPages;

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public postService: PostService) {
  }

  ngOnInit() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    // const end = (this.currentPage) * this.itemsPerPage;
    const rows = this.itemsPerPage;
    const total = -1;

    this.loadData(offset, rows, total);
  }

  public pageChanged(event: any): void {
    /*const urlTree: UrlTree = this.router.parseUrl(this.router.url);
     const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
     const s: UrlSegment[] = g.segments;
     this.router.navigateByUrl(s[0] + '/posttable/page/' + event.page);*/


    const offset = (event.page - 1) * event.itemsPerPage;
    const rows = event.itemsPerPage;

    this.loadData(offset, rows, -1);
  }

  public loadData(offset: number, rows: number, total: number) {

    this.postService.getListByPageInfo(offset, rows, -1).subscribe(
      (data: { rows, total }) => {
        this.postList = data.rows;
        this.totalItems = data.total;
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
        const offset = (this.currentPage - 1) * this.itemsPerPage;
        const rows = this.itemsPerPage;
        const total = -1;

        this.loadData(offset, rows, total);
      },
      err => {
        console.log(err);
      }
    );
  }
}

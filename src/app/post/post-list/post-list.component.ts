import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Post} from '../../shared/model/post-model';
import {PostService} from '../../shared';
import {HOST_PATH} from '../../shared';
import 'rxjs/operator/take';

@Component({
  selector: 'app-postlist',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostlistComponent implements OnInit, AfterViewInit {
  public maxSize = 5; // limit number for page links in pager
  public itemsPerPage = 5; // 每页记录数
  public totalItems: number; // 总记录数
  public currentPage = 1; // 不要手动对这个属性进行赋值，它是和分页工具条自动绑定的
  public numPages;   // fired when total pages count changes, $event:number equals to total pages count

  public postList: Array<Post>;

  private postUrl = HOST_PATH + '/p/';


  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public service: PostService) {

  }

  ngOnInit() {
    //
  }

  ngAfterViewInit(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    // const end = (this.currentPage) * this.itemsPerPage;
    const rows = this.itemsPerPage;
    const total = -1;

    this.loadData(offset, rows, total);
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

  pageChanged(event: any): void {
    const offset = (event.page - 1) * event.itemsPerPage;
    const rows = event.itemsPerPage;

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

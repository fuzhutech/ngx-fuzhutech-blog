import {Component, OnInit} from '@angular/core';
import {flyIn} from '../../shared/animations/fly-in';
import {OptionService} from '../../shared';
import {Option} from '../../shared/model/option-model';

@Component({
  selector: 'app-sys-param',
  templateUrl: './sys-param.component.html',
  styleUrls: ['./sys-param.component.css'],
  animations: [
    flyIn
  ]
})
export class SysParamComponent implements OnInit {

  public maxSize = 5;
  public itemsPerPage = 5;
  public totalItems = 15;
  public currentPage = 1;
  public numPages;
  public optionList: Array<Option>;
  public option = new Option();
  editOption: Option;

  constructor(private service: OptionService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const rows = this.itemsPerPage;

    this.service.getListByPageInfo(offset, rows, -1).subscribe(
      (data: { rows, total }) => {
        this.optionList = data.rows;
        this.totalItems = data.total;
      },
      err => {
        console.log(err);
      }
    );
  }

  public pageChanged(event: any): void {
    this.loadData();
  }

  public editPost(option: Option): void {
    this.editOption = new Option();
    this.editOption.id = option.id;
    this.editOption.name = option.name;
    this.editOption.value = option.value;
  }

  private save() {
    this.service.edit(this.editOption).subscribe(
      data => {
        this.loadData();
      },
      err => {
        console.log(err);
      }
    );
  }

}

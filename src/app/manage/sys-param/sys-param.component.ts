import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';

import {flyIn} from '../../shared/animations/fly-in';
import {Option} from '../../shared/model/option-model';
import {OptionService} from '../../core/services';

@Component({
    selector: 'app-sys-param',
    templateUrl: './sys-param.component.html',
    styleUrls: ['./sys-param.component.scss'],
    animations: [
        flyIn
    ]
})
export class SysParamComponent implements OnInit, AfterViewInit {

    displayedColumns = ['id', 'name', 'value', 'action'];
    dataSource = new MatTableDataSource<Option>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    // public option = new Option();
    editOption: Option;

    constructor(private service: OptionService) {
    }

    ngOnInit() {
        this.loadData();
    }

    editPost(option: Option): void {
        this.editOption = new Option();
        this.editOption.id = option.id;
        this.editOption.name = option.name;
        this.editOption.value = option.value;
    }

    save() {
        this.service.edit(this.editOption).subscribe(
            data => {
                this.loadData();
            },
            err => {
                console.log(err);
            }
        );
    }

    private loadData() {

        this.service.getList().subscribe(
            (data: Option[]) => {
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

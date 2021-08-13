import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReachUsService } from '../core/dataService';
import { ReachUs } from '../core/model';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
    templateUrl: './reach-us.component.html',
    styleUrls: ['./reach-us.component.scss'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ]
})
export class ReachUsComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'email', 'message', 'createdAt'];
    public dataSource: MatTableDataSource<ReachUs>;
    public reachUsPerPage = 20;
    public pageSizeOptions = [20, 50, 100];
    private pageIndex = 1;
    public count = 5;

    public isLoading = true;

    panelOpenState = false;

    constructor(private reachUsService: ReachUsService) { }

    ngOnInit() {
        this.reachUsService.getReachus(5, 1)
            .subscribe(data => {
                data.forEach(data => {
                    data.createdAt = new Date(data.createdAt).toLocaleString();
                    if (data.message.length > 80) {
                        data.truncatedMsg = data.message.slice(0 , 80) + '...';
                    }
                    else {
                        data.truncatedMsg = data.message;
                    }
                });
                this.dataSource = new MatTableDataSource(data);
                this.isLoading = false;

            });
    }

    applyFilter(event: Event) {
        this.isLoading = true;
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        this.isLoading = false;
    }

    onChangedPage(pageData: PageEvent) {
        //this.isLoading = true;
        //this.standardService.getAdminStandard(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
        //this.pageIndex = pageData.pageIndex + 1;
    }
}

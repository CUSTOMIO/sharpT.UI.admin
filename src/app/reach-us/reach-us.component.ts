import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReachUsService } from '../core/dataService';
import { ReachUs } from '../core/model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: './reach-us.component.html',
  styleUrls: ['./reach-us.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReachUsComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'truncatedMsg', 'createdAt'];
  public dataSource: MatTableDataSource<ReachUs>;
  public reachUsPerPage = 5;
  public pageSizeOptions = [20, 50, 100];
  private pageIndex = 1;
  public count: number;

  public isLoading = true;

  public panelOpenState = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (data: ReachUs[]) => {
      data.forEach( data => {
        console.log(data);
        data.createdAt = new Date(data.createdAt).toLocaleString();
        if (data.message.length > 80) {
          data.truncatedMsg = data.message.slice(0, 80) + '...';
        }
        else {
          data.truncatedMsg = data.message;
        }
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error(err)
  };


  constructor(private reachUsService: ReachUsService) { }

  ngOnInit() {
    this.reachUsService.reachUsCount()
      .subscribe(res => {
        this.count = res.count;
      })
    this.reachUsService.getReachus(this.reachUsPerPage, 1)
      .subscribe(this.observer);
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
    console.log(pageData);
    this.isLoading = true;
    this.reachUsService.getReachus(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
    //this.pageIndex = pageData.pageIndex + 1;
  }

  messageRead(data: any) {
    if (!data) {
      return
    }
    if (!data.isRead) {
      data.isRead = true;
      this.reachUsService.reachUsRead(data, data.id)
        .subscribe(res => {
          console.log(res.message);
        })
    }
  }
}

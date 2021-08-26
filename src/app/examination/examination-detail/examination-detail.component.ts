import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExaminationDetailService } from 'src/app/core/dataService';
import { ExaminationDetail } from 'src/app/core/model';
import { EditExaminationDetailComponent } from './edit-examination-detail/edit-examination-detail.component';

@Component({
    templateUrl: './examination-detail.component.html',
    styleUrls: ['./examination-detail.component.scss']
  })

export class ExaminationDetailComponent implements OnInit{

  // Paginator
  displayedColumns: string[] = ['examinationName', 'standardName', 'startOn', 'endOn', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<ExaminationDetail>;
  examinationDetailPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;

  // Loading
  public isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private observer = {
    next: (data: ExaminationDetail[]) => {
      this.dataSource = new MatTableDataSource(data);
      data.forEach(x => {
        x.startOn = new Date(x.startOn).toDateString();
        x.endOn = new Date(x.endOn).toDateString();
        x.updatedAt = new Date(x.updatedAt).toDateString();
      });
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };



  constructor(private examinationDetailService: ExaminationDetailService,
              public dialog: MatDialog){}


  ngOnInit() {
    this.examinationDetailService.getExaminationDetail(this.examinationDetailPerPage, 1)
    .subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.examinationDetailService.getExaminationDetail(pageData.pageSize, pageData.pageIndex + 1)
    .subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
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

  openDialog(examinationDetail: object, mode: string): void {
    const dialogRef = this.dialog.open(EditExaminationDetailComponent, {
      disableClose: true,
      width: '550px',
      height: '600px',
      data: {
        examinationDetail,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.examinationDetailService.getExaminationDetail(this.examinationDetailPerPage, this.pageIndex)
      .subscribe(this.observer);
      this.count += 1;
    });
  }

}

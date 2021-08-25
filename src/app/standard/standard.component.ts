import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StandardService } from '../core/dataService';
import { Standard } from '../core/model';
import { EditStandardComponent } from './edit-standard/edit-standard.component';

@Component({
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent {

  // Table & Paginator
  displayedColumns: string[] = ['name', 'courseName', 'isActive', 'allowSubjectSelection', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<Standard>;
  standardPerPage  = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;
  public standardId: number;

  // Loading
  public isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  private observer = {
    next: (data: Standard[]) => {
      this.dataSource = new MatTableDataSource(data);
      data.forEach(data => {
        data.updatedAt = new Date(data.updatedAt).toDateString();
      })
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error(err)
  };

  constructor(
    private standardService: StandardService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.standardService.standardCount()
    .subscribe(data => {
      this.count = data.count;
    },
    err => {
      console.log(err);
    });
    this.standardService.getAdminStandard(this.standardPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.standardService.getAdminStandard(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
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
  openDialog(standard: object, mode: string): void {
    const dialogRef = this.dialog.open(EditStandardComponent, {
      // disableClose: true,
      width: '450px',
      data: {
        standard,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.standardService.getAdminStandard(this.standardPerPage, this.pageIndex).subscribe(this.observer);
      this.count += 1;
    });
  }
}

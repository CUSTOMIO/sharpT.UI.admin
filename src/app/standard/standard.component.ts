import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StandardService } from '../core/dataService';
import { Standard } from '../core/model';
import { EditStandardComponent } from './edit-standard/edit-standard.component';

@Component({
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent {
  title = 'Standard';

  public standard: Standard[];
  
  //Paginator
  displayedColumns: string[] = ['name', 'course', 'isActive', 'edit'];
  dataSource: MatTableDataSource<Standard>;
  
  standardPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex: number = 1;
  public count: number;

  //Dialog
  public standardId: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (x: Standard[]) => {
      this.dataSource = new MatTableDataSource(x);
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(
    private standardService: StandardService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.standardService.standardCount()
    .subscribe(data => {
      this.count = data.count
    },
    err => {
      console.log(err)
    })
    this.standardService.getAdminStandard(this.standardPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.standardService.getAdminStandard(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(standard: object, mode :String): void {
    const dialogRef = this.dialog.open(EditStandardComponent, {
      // disableClose: true,
      width: '450px',
      data: {
        standard: standard,
        mode : mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return
      }
      this.count += 1;
      this.standardService.getAdminStandard(this.standardPerPage, this.pageIndex).subscribe(this.observer);
    });
  }
}

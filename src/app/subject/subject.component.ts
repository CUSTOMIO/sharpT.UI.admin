import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectService } from '../core/dataService';
import { Subject } from '../core/model';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  // Table & Paginator
  displayedColumns: string[] = ['name', 'standardName', 'isActive', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<Subject>;
  subjectPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;

  // Loading
  public isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private observer = {
    next: (data) => {
      data.forEach(data => {
        data.updatedAt = new Date(data.updatedAt).toDateString();
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(
    private subjectService: SubjectService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subjectService.subjectCount()
    .subscribe(data => {
      this.count = data.count;
    })
    this.subjectService.getSubject(this.subjectPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.subjectService.getSubject(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }

  applyFilter(event: Event) {
    this.isLoading = true;
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isLoading = false;

  }
  openDialog(subject: object, mode: string): void {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      // disableClose: true,
      width: '450px',
      data: {
        subject,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.subjectService.getSubject(this.subjectPerPage, this.pageIndex).subscribe(this.observer);
      this.count += 1;
    });
  }
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StandardService, SubjectService } from '../core/dataService';
import { Standard, Subject } from '../core/model';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  // Table & Paginator
  displayedColumns: string[] = ['name', 'standardName', 'rate', 'isActive', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<Subject>;
  subjectPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;

  // Filter data
  public filterStandardId = '';
  public standards: Standard[];
  public filterStatus = '';

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
    private standardService: StandardService
  ) { }

  ngOnInit() {
    this.getSubjectCount();
    this.subjectService.getSubject(
      this.subjectPerPage,
      1,
      this.filterStandardId,
      this.filterStatus
    ).subscribe(this.observer);

    this.standardService.getStandard()
      .subscribe(res => {
        this.standards = res;
      })
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData)
    this.isLoading = true;
    this.subjectService.getSubject(
      pageData.pageSize,
      pageData.pageIndex + 1,
      this.filterStandardId,
      this.filterStatus).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }

  standardIdFilter(id) {
    this.filterStandardId = id;
  }

  isActiveFilter(value: string) {
    this.filterStatus = value;
  }

  setFilter() {
    this.subjectService.getSubject(this.subjectPerPage, 1, this.filterStandardId, this.filterStatus).subscribe(this.observer);
    this.getSubjectCount();
  }

  private getSubjectCount() {
    this.subjectService.subjectCount(this.filterStandardId, this.filterStatus)
      .subscribe(data => {
        this.count = data.count;
      });
  }

  applyFilter(event: Event): void {
    this.isLoading = true;
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
      this.subjectService.getSubject(this.subjectPerPage, this.pageIndex, this.filterStandardId, this.filterStatus)
      .subscribe(this.observer);
      this.count += 1;
    });
  }
}



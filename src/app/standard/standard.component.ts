import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService, StandardService } from '../core/dataService';
import { Course, Standard } from '../core/model';
import { EditStandardComponent } from './edit-standard/edit-standard.component';

@Component({
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent {

  // Table & Paginator
  displayedColumns: string[] = ['name', 'courseName', 'rate', 'isActive', 'allowSubjectSelection', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<Standard>;
  standardPerPage  = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;
  public standardId: number;

  // Filter Data
  public filterCourseId = '';
  public course: Course[];
  public filterStatus = '';
  public filterSubjectSelection = '';

  // Loading
  public isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  private observer = {
    next: (data: Standard[]) => {
      console.log(data)
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
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getStandardCount()

    this.standardService.getAdminStandard(
      this.standardPerPage,
      1,
      this.filterCourseId,
      this.filterStatus,
      this.filterSubjectSelection
      ).subscribe(this.observer);

    this.courseService.getCourse()
      .subscribe(res => {
        this.course = res;
      })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.standardService.getAdminStandard(
      pageData.pageSize,
      pageData.pageIndex + 1,
      this.filterCourseId,
      this.filterStatus,
      this.filterSubjectSelection
    ).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;  
  }

  courseIdFilter(id) {
    this.filterCourseId = id;
  }

  isActiveFilter(value: string) {
    this.filterStatus = value
  }

  subjectSelectionFilter(value: string) {
    this.filterSubjectSelection = value
  }

  setFilter() {
    this.standardService.getAdminStandard(
      this.standardPerPage,
      1,
      this.filterCourseId,
      this.filterStatus,
      this.filterSubjectSelection
    ).subscribe(this.observer);
    this.getStandardCount()
  }

  private getStandardCount() {
    this.standardService.standardCount(this.filterCourseId, this.filterStatus, this.filterSubjectSelection)
      .subscribe(data => {
        console.log(data);
        this.count = data.count;
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
  openDialog(standard: object, mode: string): void {
    const dialogRef = this.dialog.open(EditStandardComponent, {
      // disableClose: true,
      width: '650px',
      data: {
        standard,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.standardService.getAdminStandard(
        this.standardPerPage,
        this.pageIndex,
        this.filterCourseId,
        this.filterStatus,
        this.filterSubjectSelection
      ).subscribe(this.observer);
      console.log(result);
    });
  }
}

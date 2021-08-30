import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../core/dataService';
import { BatchService } from '../core/dataService/batch/batch.services';
import { Batch, Standard } from '../core/model';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  // Table & Paginator
  displayedColumns: string[] = ['name', 'batchName', 'isActive', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<Standard>;
  standardPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;

  // Filter Data
  public batch: Batch[];
  public filterBatchId = '';
  public filterStatus = '';

  // Loading
  public isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  private observer = {
    next: (data) => {
      this.dataSource = new MatTableDataSource(data);
      data.forEach(data => {
        data.updatedAt = new Date(data.updatedAt).toDateString();
      })
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
    private batchService: BatchService
  ) { }

  ngOnInit() {
    this.getCourseCount()

    this.courseService.getAdminCourse(this.standardPerPage, 1, this.filterBatchId, this.filterStatus).subscribe(this.observer);

    this.batchService.getAdminBatch()
      .subscribe(res => {
        this.batch = res;
      })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.courseService.getAdminCourse(pageData.pageSize, pageData.pageIndex + 1, this.filterBatchId, this.filterStatus).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }


  batchIdFilter(id) {
    this.filterBatchId = id;
  }

  isActiveFilter(value: string) {
    this.filterStatus = value
  }

  getCourseCount() {
    this.courseService.courseCount(this.filterBatchId, this.filterStatus)
      .subscribe(data => {
        this.count = data.count;
      });
  }

  setFilter() {
    this.courseService.getAdminCourse(
      this.standardPerPage,
      1,
      this.filterBatchId,
      this.filterStatus
    ).subscribe(this.observer);
    this.getCourseCount()
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
  openDialog(course: object, mode: string): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      // disableClose: true,
      width: '450px',
      data: {
        course,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.courseService.getAdminCourse(this.standardPerPage, this.pageIndex, this.filterBatchId, this.filterStatus).subscribe(this.observer);
      this.count += 1;
    });
  }
}

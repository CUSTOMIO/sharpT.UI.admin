import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../core/dataService';
import { Standard } from '../core/model';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  // Table & Paginator
  displayedColumns: string[] = ['name', 'course', 'isActive', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<Standard>;
  standardPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;

  // Loading
  public isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (data) => {
      this.dataSource = new MatTableDataSource(data);
      data.forEach(data => {
        data.updatedAt = new Date(data.updatedAt).toDateString();
      })
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.courseService.courseCount()
    .subscribe(data => {
      this.count = data.count;
    },
    err => {
      console.log(err);
    });
    this.courseService.getAdminCourse(this.standardPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.courseService.getAdminCourse(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
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
      this.courseService.getAdminCourse(this.standardPerPage, this.pageIndex).subscribe(this.observer);
      this.count += 1;
    });
  }
}

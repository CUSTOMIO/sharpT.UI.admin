import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectService } from '../core/dataService';
import { Subject } from '../core/model';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-main',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public subject: Subject[];

  //Paginator
  displayedColumns: string[] = ['name', 'standard', 'isActive', 'edit'];
  dataSource: MatTableDataSource<Subject>;

  subjectPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex: number = 1;
  public count: number;


  //Dialog
  public subjectId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (x: Subject[]) => {
      this.dataSource = new MatTableDataSource(x);
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
      this.count = data.count
    },
    err => {
      console.log(err)
    })
    this.subjectService.getSubject(this.subjectPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.subjectService.getSubject(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }

  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(subject: object, mode :String): void {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      // disableClose: true,
      width: '450px',
      data: {
        subject: subject,
        mode : mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return
      }
      this.count += 1;
      this.subjectService.getSubject(this.subjectPerPage, this.pageIndex).subscribe(this.observer);
    });
  }
}



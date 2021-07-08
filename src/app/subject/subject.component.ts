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

  totalSubjects = 40;
  subjectPerPage = 20;
  pageSizeOptions = [20, 50, 100];

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
    this.subjectService.getSubject(this.subjectPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.subjectService.getSubject(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
  }

  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(subject: object): void {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      // disableClose: true,
      width: '350px',
      data: {
        subject: subject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return
      }
      this.subjectService.getSubject(this.subjectPerPage, 1).subscribe(this.observer);
    });
  }
}



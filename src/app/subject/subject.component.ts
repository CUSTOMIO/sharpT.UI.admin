import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectService } from '../core/dataService';
import { Subject } from '../core/model';

@Component({
  selector: 'app-main',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public subject: Subject[];

  //Paginator
  displayedColumns: string[] = ['name', 'standard' ,'isActive'];
  dataSource: MatTableDataSource<Subject>;

  totalSubjects = 40;
  subjectPerPage = 20;
  pageSizeOptions = [20, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (x: Subject[]) => {
      this.dataSource = new MatTableDataSource(x);
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(
    private subjectService: SubjectService
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
}



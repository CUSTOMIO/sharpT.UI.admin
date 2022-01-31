import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestimonialService } from '../core/dataService';
import { Testimonial } from '../core/model';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TestimonialComponent implements OnInit {

  public testimonial: Testimonial[];
  public isLoading = true;

  //Paginator
  dataSource: MatTableDataSource<Testimonial>;
  displayedColumns: string[] = ['Username', 'Review', 'Status', 'Created At'];
  testimonialPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number = 10;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (data: Testimonial[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error(err)
  };

  constructor(private testimonialService: TestimonialService) { }

  ngOnInit(): void {
    this.testimonialService.getTestimonial(this.testimonialPerPage, 1)
      .subscribe(this.observer);
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

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.testimonialService.getTestimonial(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
  }
  reviewRead(data: any) {
    if (!data) {
      return;
    }
    if (!data.isRead) {
      this.testimonialService.testimonialRead('tst', data.id)
        .subscribe(res => {
          if (res.message) {
            data.isRead = true;
          }
        });
    }
  }

}

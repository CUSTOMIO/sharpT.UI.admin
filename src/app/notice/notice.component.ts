import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NoticeService } from '../core/dataService';
import { Notice } from '../core/model';
import { EditNoticeComponent } from './edit-notice/edit-notice.component';

@Component({
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
    // Table & Paginator
    displayedColumns: string[] = ['content', 'isActive', 'createdAt', 'updatedAt', 'edit'];
    dataSource: MatTableDataSource<Notice>;
    noticePerPage = 20;
    pageSizeOptions = [20, 50, 100];
    pageIndex = 1;
    public count: number;

    //Loading
    public isLoading = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private noticeService: NoticeService,
                public dialog: MatDialog,
    ) {
    }

    private observer = {
        next: (data) => {
            data.forEach(data => {
                data.updatedAt = new Date(data.updatedAt).toDateString();
                data.createdAt = new Date(data.createdAt).toDateString();
            });
            this.dataSource = new MatTableDataSource(data);
            //this.dataSource.sort = this.sort;
            this.isLoading = false;
        },
        error: err => console.error('Observer got an error: ' + err)
    };

    ngOnInit(): void {
        this.noticeService.getNotice(this.noticePerPage, 1)
            .subscribe(this.observer);
    }

    onChangedPage(pageData: PageEvent): void {
        this.isLoading = true;
        this.noticeService.getNotice(
            pageData.pageSize,
            pageData.pageIndex + 1)
            .subscribe(this.observer);
        this.pageIndex = pageData.pageIndex + 1;
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

      
  openDialog(notice: object, mode: string): void {
    const dialogRef = this.dialog.open(EditNoticeComponent, {
      // disableClose: true,
      width: '450px',
      data: {
          notice,
          mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    //   if (!result) {
    //     return;
    //   }
    //   this.subjectService.getSubject(this.subjectPerPage, this.pageIndex, this.filterStandardId, this.filterStatus)
    //   .subscribe(this.observer);
    //   this.count += 1;
    });
  }
}



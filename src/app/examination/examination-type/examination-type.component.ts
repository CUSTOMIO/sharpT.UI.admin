import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExaminationService } from 'src/app/core/dataService';
import { ExaminationType } from 'src/app/core/model';
import { EditExaminationTypeComponent } from './edit-examination-type/edit-examination-type.component';

@Component({
    templateUrl: './examination-type.component.html',
    styleUrls: ['./examination-type.component.scss']
  })

export class ExaminationTypeComponent  implements OnInit{
    title = 'Examination-Types';
    public ExaminationType: ExaminationType[];

  // Paginator
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'edit'];
  dataSource: MatTableDataSource<ExaminationType>;

  examinationTypePerPage = 20;
  pageSizeOptions = [10, 25, 100];
  pageIndex = 1;
  public count: number;

  // Dialog
  public examinationTypeId: number;

  // Loading
  public isLoading = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    private observer = {
        next: (data: ExaminationType[]) => {
          this.dataSource = new MatTableDataSource(data);
          data.forEach(data => {
            data.createdAt = new Date(data.createdAt).toLocaleString()
            data.updatedAt = new Date(data.updatedAt).toLocaleString()
          })
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error: err => console.error('Observer got an error: ' + err)
      };

    constructor(private examinationService: ExaminationService,
                public dialog: MatDialog){
    }

    ngOnInit() {
        this.examinationService.examinationCount()
        .subscribe(data => {
          this.count = data.count;
        },
        err => {
          console.log(err);
        })
        this.examinationService.getExamination(this.examinationTypePerPage, 1).subscribe(this.observer)
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.examinationService.getExamination(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
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

      openDialog(examinationType: object, mode : string): void {
        const dialogRef = this.dialog.open(EditExaminationTypeComponent, {
          // disableClose: true,
          width: '450px',
          data: {
            examinationType,
            mode
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            return;
          }
          this.examinationService.getExamination(this.examinationTypePerPage, this.pageIndex).subscribe(this.observer);
          this.count += 1;
        });
      }
}

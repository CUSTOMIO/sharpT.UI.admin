import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ExaminationDetailService, StandardService, UserService } from '../core/dataService';
import { ExaminationDetailBySId, Standard, UserByStandardId } from '../core/model';
import { EditResultComponent } from './edit-result/edit-result.component';

@Component({
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
    public standard: Standard[];
    public examinationDetail: ExaminationDetailBySId[];
    public user: UserByStandardId[];

    // Table & Paginator
    public displayedColumns: string[] = ['email', 'firstName'];
    public dataSource: MatTableDataSource<UserByStandardId>;
    public resultPerPage = 20;
    public pageSizeOptions = [20, 50, 100];
    private pageIndex = 1;
    public count: number;
    public standardId: number;

    // Loading
    public isLoading = true;

    // Form
  public searchResult: FormGroup;

  @ViewChild(MatSort) sort: MatSort;


    constructor(private standardService: StandardService,
                private userService: UserService,
                private examinationService: ExaminationDetailService,
                private formbuilder: FormBuilder,
                public dialog: MatDialog,
                private router: Router,
                private snackBar: MatSnackBar) {
        this.searchResult = this.formbuilder.group({
            standardId: ['', [Validators.required]],
            examinationDetailId: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.standardService.getStandard()
            .subscribe(res => {
                this.standard = res;
            });
    }

    getUser(result) {
        this.userService.getUserBySId(this.resultPerPage, this.pageIndex, result)
            .subscribe(res => {
                this.user = res;
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
            });
    }

    getExamAndUserDetail(result) {
        this.examinationService.getExaminationDetailBySId(result)
            .subscribe(res => {
                this.examinationDetail = res;
            });
        this.getUser(result);
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

    openDialog(user: object): void {
        if (this.searchResult.invalid){
            return;
        }
        const dialogRef = this.dialog.open(EditResultComponent, {
            // disableClose: true,
            width: 'fit-content ',
            data: {
                user,
                searchResult: this.searchResult.value
            }
        });
        this.snackBar.open('Test', 'Test');
        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            return;
          }
        });
      }
}

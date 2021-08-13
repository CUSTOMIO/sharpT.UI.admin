import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    public displayedColumns: string[] = ['email', 'name'];
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

    constructor(private standardService: StandardService,
                private userService: UserService,
                private examinationService: ExaminationDetailService,
                private formbuilder: FormBuilder,
                public dialog: MatDialog,
                private router: Router) {
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
            });
    }

    getExamAndUserDetail(result) {
        this.examinationService.getExaminationDetailBySId(result)
            .subscribe(res => {
                this.examinationDetail = res;
            });
        this.getUser(result);
    }
    openDialog(user: object): void {
        if (this.searchResult.invalid){
            return;
        }
        const dialogRef = this.dialog.open(EditResultComponent, {
          // disableClose: true,
          width: '450px',
          data: {
              user,
              searchResult: this.searchResult.value
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (!result) {
            return;
          }
         // this.standardService.getAdminStandard(this.standardPerPage, this.pageIndex).subscribe(this.observer);
         // this.count += 1;
        });
      }
}

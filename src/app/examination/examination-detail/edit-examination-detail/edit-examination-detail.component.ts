import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExaminationDetailService, ExaminationService, StandardService } from 'src/app/core/dataService';
import { AcademicYearService } from 'src/app/core/dataService/academic-year/academic-year.service';
import { AcademicYear, ExaminationDetail, Standard } from 'src/app/core/model';

export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
    templateUrl: './edit-examination-detail.component.html',
    styleUrls: ['./edit-examination-detail.component.scss'],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
      ]
})


export class EditExaminationDetailComponent implements OnInit {

    private editForm: FormGroup;

    public standard: Standard[];
    public academicYear: AcademicYear[];
    public examination: any;
    selectYear: any;
    private endOn: Date;
    private startOn: Date;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { examinationDetail: any, mode: string },
        private dialogRef: MatDialogRef<EditExaminationDetailComponent>,
        private formBuilder: FormBuilder,
        private standardService: StandardService,
        private examinationService: ExaminationService,
        private examinationDetailService: ExaminationDetailService,
        private academicYearService: AcademicYearService) {
        this.editForm = formBuilder.group({
            examinationId: [, [Validators.required]],
            standardId: [, [Validators.required]],
            academicYearId: [, [Validators.required]],
            startOn: [, [Validators.required]],
            endOn: [, [Validators.required]],
            totalMarks: [, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        });
        if (data.mode === 'edit') {
            this.startOn = new Date(data.examinationDetail.startOn);
            this.endOn = new Date(data.examinationDetail.endOn);
            this.editForm.get('standardId').setValue(data.examinationDetail.standardId);
            this.editForm.get('startOn').setValue(this.startOn);
            this.editForm.get('endOn').setValue(this.endOn);
            this.editForm.get('totalMarks').setValue(data.examinationDetail.totalMarks);
            this.editForm.get('examinationId').setValue(data.examinationDetail.examinationId);
            this.editForm.get('academicYearId').setValue(data.examinationDetail.academicYearId);
        }
    }
    ngOnInit() {
        this.standardService.getStandard()
        .subscribe(res => {
            this.standard = res;
        });
        this.examinationService.examination()
        .subscribe(res => {
            this.examination = res;
        });
        this.academicYearService.academicYear()
        .subscribe(res => {
            this.academicYear = res;
            console.log(this.academicYear);
        });
     }

    onSubmit() {
        if (!this.editForm.valid) {
            return;
        }
        const observer = {
            next: (x: {message: boolean}) => {
                if (x.message) {
                    this.dialogRef.close({ data: x.message });
                }
            },
            error: (err: string) => console.error(err)
        };

        if (this.data.mode === 'edit') {
            this.examinationDetailService.postEditExaminationDetail(this.editForm.value, this.data.examinationDetail.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            this.examinationDetailService.postAddExaminationDetail(this.editForm.value)
                .subscribe(observer);
            console.log(this.editForm.value);
        }
    }

    closeDialog() {
        this.dialogRef.close();
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExaminationDetailService, ExaminationService, ExaminationSubjectDetailService, StandardService, SubjectService } from 'src/app/core/dataService';
import { AcademicYearService } from 'src/app/core/dataService/academic-year/academic-year.service';
import { AcademicYear, ExaminationDetail, ExaminationSubjectDetail, Standard } from 'src/app/core/model';

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
  //providers: [
  //  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  //]
})


export class EditExaminationDetailComponent implements OnInit {

  // Form
  public editForm: FormGroup;
  public subjectForm: FormGroup;

  public standard: Standard[];
  public subjects: any; // assign data type here in place of any
  public academicYear: AcademicYear[];
  public examination: any;
  //public examinationSubjectDetail: ExaminationSubjectDetail[];

  private startOn: Date;
  private endOn: Date;

  // Loader
  public isLoading = true;
  public spinnerLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { examinationDetail: any, mode: string },
    private dialogRef: MatDialogRef<EditExaminationDetailComponent>,
    private formBuilder: FormBuilder,
    private standardService: StandardService,
    private examinationService: ExaminationService,
    private examinationDetailService: ExaminationDetailService,
    private examinationSubjectDetailService: ExaminationSubjectDetailService,
    private academicYearService: AcademicYearService,
    private subjectService: SubjectService) {

    this.editForm = formBuilder.group({
      examinationId: [, [Validators.required]],
      standardId: [, [Validators.required]],
      academicYearId: [, [Validators.required]],
      startOn: [, [Validators.required]],
      endOn: [, [Validators.required]],
      data: new FormArray([], Validators.required)
    });

    if (data.mode === 'edit') {
      console.log(data);
      this.getSubjects(data.examinationDetail.standardId);

      this.startOn = new Date(data.examinationDetail.startOn);
      this.endOn = new Date(data.examinationDetail.endOn);

      this.editForm.get('standardId').setValue(data.examinationDetail.standardId);
      this.editForm.get('startOn').setValue(this.startOn);
      this.editForm.get('endOn').setValue(this.endOn);
      this.editForm.get('examinationId').setValue(data.examinationDetail.examinationId);
      this.editForm.get('academicYearId').setValue(data.examinationDetail.academicYearId);

      this.getExaminationSubjectDetail(this.data.examinationDetail.id);
    }

    this.subjectForm = this.formBuilder.group({
      data: new FormArray([])
    });
  }

  get t() { return this.editForm.controls.data as FormArray; }

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
      });
    this.isLoading = false;
  }

  getSubjects(standardId) {

    if (this.subjectForm) {
      this.t.clear();
    }

    this.subjectService.getSubjectByStandardId(standardId)
      .subscribe((res) => {
        this.subjects = res;
        for (let s of this.subjects.data) {
          this.t.push(this.formBuilder.group({
            subjectId: [s.id, [Validators.required]],
            subjectName: [s.name, [Validators.required]],
            outOf: ['', [Validators.required]]
          }));
        }
      })
  }

  getExaminationSubjectDetail(examinationDetailId: number) {
    this.examinationSubjectDetailService.getExaminationSubjectDetail(examinationDetailId)
      .subscribe(res => {
        res.forEach(e => {
          this.subjects.data.forEach(s => {
            if (e.subjectId == s.id) {
              const index = this.t.value.findIndex((x, id) => {
                return x.subjectId === e.subjectId;
              })
              this.t.at(index).patchValue({
                outOf: e.outOf
              })
            }
          })
        })
      })
  }

  onSubmit() {
    if (!this.editForm.valid) {
      return;
    }

    this.spinnerLoading = true;

    const observer = {
      next: (x: { message: boolean }) => {
        if (x.message) {
          this.dialogRef.close({ data: x.message });
        }
        this.spinnerLoading = false;
      },
      error: err => {
        console.error(err);
        this.spinnerLoading = false;
      }
    };

    if (this.data.mode === 'edit') {
      this.examinationDetailService.postEditExaminationDetail(this.editForm.value, this.data.examinationDetail.id)
        .subscribe(observer);
    }

    else if (this.data.mode === 'new') {
      this.examinationDetailService.postAddExaminationDetail(this.editForm.value)
        .subscribe(observer);
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }
}

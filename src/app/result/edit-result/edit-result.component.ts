import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExaminationSubjectDetailService, ResultService, UserService } from 'src/app/core/dataService';
import { UserSubject } from 'src/app/core/model';

@Component({
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.scss']
})

export class EditResultComponent implements OnInit {

  public userSubject: any;
  public resultForm: FormGroup;
  public subjectArray: Array<number> = [];
  public autoFetchResult: any;
  public autoFetchResultForm: FormGroup;
  public newResult = true;

  public spinnerLoading = true;
  public isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any, searchResult: any },
    private dialogRef: MatDialogRef<EditResultComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private examinationSubjectDetailService: ExaminationSubjectDetailService,
    private resultService: ResultService
  ) {
    this.resultForm = this.formBuilder.group({
      data: new FormArray([])
    });
  }

  get t(): FormArray { return this.resultForm.controls.data as FormArray; }

  ngOnInit(): void {
    this.userService.getUserSubject(this.data.user.userId)
      .subscribe(res => {
        this.userSubject = res;
        for (const s of this.userSubject) {

          this.subjectArray.push(+s.subjectId);

          this.t.push(this.formBuilder.group({
            userId: [{ value: this.data.user.userId, disabled: true }, [Validators.required]],
            examinationDetailId: [this.data.searchResult.examinationDetailId, [Validators.required]],
            subjectId: [s.subjectId, [Validators.required]],
            subjectName: [{ value: s.name, disabled: true }, [Validators.required]],
            marksObtained: ['', [Validators.required]],
            outOf: [{ value: '', disabled: true }, [Validators.required]]
          }));
        }
        this.autoFillMarksObtained();
        this.getExaminationSubjectDetail(this.data.searchResult.examinationDetailId);
      });


  }

  public patchValues(id: number): FormGroup {
    return this.formBuilder.group({
      subjectId: [id],
      examinationDetailId: this.data.searchResult.examinationDetailId,
      userId: this.data.user.userId,
    });
  }

  getExaminationSubjectDetail(examinationDetailId: number): void {
    this.examinationSubjectDetailService.getExaminationSubjectDetail(examinationDetailId)
      .subscribe(res => {
        res.forEach(e => {
          this.userSubject.forEach(s => {
            if (e.subjectId === s.subjectId) {
              const index = this.t.value.findIndex((x, id) => {
                return x.subjectId === e.subjectId;
              });
              this.t.at(index).patchValue({
                outOf: e.outOf
              });
            }
          });
        });
        this.spinnerLoading = false;
      });
  }

  private autoFillMarksObtained(): void {
    this.resultService.postFetchResult(
      this.data.searchResult.examinationDetailId,
      this.subjectArray,
      this.data.user.userId)
      .subscribe(data => {
        this.autoFetchResult = data;
        if (this.autoFetchResult.length > 0) {
          this.newResult = false;
          for (const fetchResult of this.autoFetchResult) {
            for (const result of this.t.value) {
              if (fetchResult.subjectId === result.subjectId) {
                const index = this.t.value.findIndex((x, id) => {
                  return x.subjectId === result.subjectId;
                });
                this.t.at(index).patchValue({
                  marksObtained: fetchResult.marksObtained
                });
              }
            }
          }
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    console.log(this.resultForm.value);
    if (this.newResult) {
      this.resultService.postAddResult(this.resultForm.value, this.data.user.userId)
        .subscribe(res => {
          this.isSubmitting = false;
          if(res.message){
            this.closeDialog();
          }
        });
    } else {
      this.resultService.postEditResult(this.resultForm.value, this.data.user.userId)
        .subscribe(res => {
          this.isSubmitting = false;
          if(res.message){
            this.closeDialog();
          }
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExaminationSubjectDetailService, UserService } from 'src/app/core/dataService';
import { UserSubject } from 'src/app/core/model';

@Component({
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.scss']
})

export class EditResultComponent implements OnInit {

  public userSubject: any;
  public resultForm: FormGroup;

  public spinnerLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any, searchResult: any },
    private dialogRef: MatDialogRef<EditResultComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private examinationSubjectDetailService: ExaminationSubjectDetailService
  ) {
    this.resultForm = this.formBuilder.group({
      data: new FormArray([])
    });
  }

  get t() { return this.resultForm.controls.data as FormArray; }

  ngOnInit() {
    this.userService.getUserSubject(this.data.user.userId)
      .subscribe(res => {
        this.userSubject = res;
        for (let s of this.userSubject) {
          this.t.push(this.formBuilder.group({
            userId: [this.data.user.userId, [Validators.required]],
            examinationDetailId: [this.data.searchResult.examinationDetailId, [Validators.required]],
            subjectId: [s.subjectId, [Validators.required]],
            subjectName: [s.name, [Validators.required]],
            marksObtained: ['', [Validators.required]],
            outOf: ['', [Validators.required]]
          }));
        }
        this.getExaminationSubjectDetail(this.data.searchResult.examinationDetailId);
      });
  }

  public patchValues(id: number) {
    return this.formBuilder.group({
      subjectId: [id],
      examinationDetailId: this.data.searchResult.examinationDetailId,
      userId: this.data.user.userId,
    });
  }

  getExaminationSubjectDetail(examinationDetailId: number) {
    this.examinationSubjectDetailService.getExaminationSubjectDetail(examinationDetailId)
      .subscribe(res => {
        res.forEach(e => {
          this.userSubject.forEach(s => {
            if (e.subjectId == s.subjectId) {
              const index = this.t.value.findIndex((x, id) => {
                return x.subjectId === e.subjectId;
              })
              this.t.at(index).patchValue({
                outOf: e.outOf
              })
            }
          })
        })
        this.spinnerLoading = false;
        console.log('Trigggered')
      })
  }

  onSubmit() {
    console.log(this.resultForm.get('data').value)
  }

  closeDialog() {
    this.dialogRef.close();
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/dataService';
import { UserSubject } from 'src/app/core/model';

@Component({
    templateUrl: './edit-result.component.html',
    styleUrls: ['./edit-result.component.scss']
})

export class EditResultComponent implements OnInit {

    public userSubject: any;
    // public userSubject: UserSubject[];
    public resultForm: FormArray;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { user: any, searchResult: any },
        private dialogRef: MatDialogRef<EditResultComponent>,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        this.resultForm = this.formBuilder.array([
            this.formBuilder.group({
                marksObtained: ['', Validators.required]
            })
        ]);
    }

    ngOnInit() {
        console.log(this.data)
        this.userService.getUserSubject(this.data.user.userId)
            .subscribe(res => {
                this.userSubject = res;
                console.log(this.userSubject);
                // for(let s of this.userSubject) {
                //     //console.log(s);
                //     (this.resultForm.controls['subjects'] as FormArray).push(this.patchValues(s.subjectId));
                // }
                // console.log(this.resultForm.value);
            });
    }

    public patchValues(id: number) {
        return this.formBuilder.group({
          subjectId: [id],
          examinationDetailId: this.data.searchResult.examinationDetailId,
          userId: this.data.user.userId,
        });
      }

      onSubmit() {
          console.log(this.resultForm.value)
      }

    closeDialog() {
        this.dialogRef.close();
    }
}


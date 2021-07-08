import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StandardService, SubjectService } from 'src/app/core/dataService';

@Component({
    selector: 'app-verify',
    templateUrl: './edit-subject.component.html',
    styleUrls: ['./edit-subject.component.scss'],
})
export class EditSubjectComponent implements OnInit {

    public standard: object;
    private editForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { subject: any},
        private dialogRef: MatDialogRef<EditSubjectComponent>,
        private standardService : StandardService,
        private subjectService: SubjectService,
        private formBuilder: FormBuilder) {
            this.editForm = formBuilder.group({
                name: [, [Validators.required]],
                standardId: ['', [Validators.required]],
                isActive: ['', [Validators.required]],
                description: ['', [Validators.required]]
            })
            this.editForm.get('name').setValue(data.subject.name);
            // this.editForm.get('standard').setValue(data.subject.SubjectStandardId.name);
            this.editForm.controls['standardId'].setValue(data.subject.SubjectStandardId.id);
            this.editForm.get('isActive').setValue(data.subject.isActive);
            this.editForm.get('description').setValue(data.subject.description);
    }
    ngOnInit() {
        const observer = {
            next: (x) => {
                this.standard = x;
            },
            error: err => console.error('Observer got an error: ' + err)
          };
        this.standardService.getStandard().subscribe(observer)
    }

    onSubmit(){
        // console.log(this.editForm.value, this.data.subject.id)
        const observer = {
            next: (x) => {
                if (x.message !== null) {
                    this.dialogRef.close({ data: x.message });
                  }
            },
            error: err => console.error('Observer got an error: ' + err)
          };
        this.subjectService.postEditSubject(this.editForm.value, this.data.subject.id)
        .subscribe(observer)
    }
}



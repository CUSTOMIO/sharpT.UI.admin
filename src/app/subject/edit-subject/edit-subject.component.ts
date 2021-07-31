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
        @Inject(MAT_DIALOG_DATA) public data: { subject: any, mode: string },
        private dialogRef: MatDialogRef<EditSubjectComponent>,
        private standardService: StandardService,
        private subjectService: SubjectService,
        private formBuilder: FormBuilder) {
        this.editForm = formBuilder.group({
            name: ['', [Validators.required]],
            standardId: ['', [Validators.required]],
            isActive: [false, [Validators.required]],
            description: ['', [Validators.required]]
        })
        if (data.mode === 'edit') {
            this.editForm.get('name').setValue(data.subject.name);
            this.editForm.controls.standardId.setValue(data.subject.standardId);
            this.editForm.get('isActive').setValue(data.subject.isActive);
            this.editForm.get('description').setValue(data.subject.description);
        }
    }
    ngOnInit() {
        const observer = {
            next: (x) => {
                this.standard = x;
            },
            error: err => console.error('Observer got an error: ' + err)
        };
        this.standardService.getStandard().subscribe(observer);
    }

    onSubmit() {
        if (!this.editForm.valid) {
            return;
        }
        const observer = {
            next: (x) => {
                if (x.message !== null) {
                    this.dialogRef.close({ data: x.message });
                }
            },
            error: err => console.error('Observer got an error: ' + err)
        };
        if (this.data.mode === 'edit') {
            this.subjectService.postEditSubject(this.editForm.value, this.data.subject.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            this.subjectService.postAddSubject(this.editForm.value)
                .subscribe(observer)
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
}



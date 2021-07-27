import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExaminationService } from 'src/app/core/dataService';

@Component({
    templateUrl: './edit-examination-type.component.html',
    styleUrls: ['./edit-examination-type.component.scss'],
})
export class EditExaminationTypeComponent implements OnInit {

    private editForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { examinationType: any, mode: string },
        private dialogRef: MatDialogRef<EditExaminationTypeComponent>,
        private formBuilder: FormBuilder,
        private examinationService: ExaminationService,) {
        this.editForm = formBuilder.group({
            name: [, [Validators.required]],
            // isActive: ['', [Validators.required]]
        })
        if (data.mode === 'edit') {
            this.editForm.get('name').setValue(data.examinationType.name);
        }
        console.log(this.data.examinationType)
    }
    ngOnInit() { }

    onSubmit() {
        console.log(this.editForm.value)
        // if (!this.editForm.valid) {
            //     return
            // }
            const observer = {
                next: (x) => {
                    console.log(x)
                    if (x.message) {
                        this.dialogRef.close({ data: x.message });
                    }
                },
                error: err => console.error('Observer got an error: ' + err)
            };
            
            if (this.data.mode === 'edit') {
                this.examinationService.postEditExamination(this.editForm.value, this.data.examinationType.id)
                .subscribe(observer)
            }
            else if (this.data.mode === 'new') {
                this.examinationService.postAddExamination(this.editForm.value)
                .subscribe(observer)
                console.log(this.editForm.value)
        }
    }

    closeDialog() {
        this.dialogRef.close()
    }
}



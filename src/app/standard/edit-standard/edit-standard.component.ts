import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService, StandardService } from 'src/app/core/dataService';

@Component({
    templateUrl: './edit-standard.component.html',
    styleUrls: ['./edit-standard.component.scss'],
})
export class EditStandardComponent implements OnInit {

    private editForm: FormGroup;
    public course: object;
    public isLoading = true;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { standard: any, mode: string },
        private dialogRef: MatDialogRef<EditStandardComponent>,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private standardService: StandardService) {
        this.editForm = formBuilder.group({
            name: [, [Validators.required]],
            courseId: ['', [Validators.required]],
            isActive: [false, [Validators.required]],
            allowSubjectSelection: [false, [Validators.required]],
            description: ['', [Validators.required]]
        });
        if (data.mode === 'edit') {
            this.editForm.controls.name.setValue(data.standard.name);
            this.editForm.controls.courseId.setValue(data.standard.courseId);
            this.editForm.controls.isActive.setValue(data.standard.isActive);
            this.editForm.controls.allowSubjectSelection.setValue(data.standard.allowSubjectSelection);
            this.editForm.controls.description.setValue(data.standard.description);
        }
    }
    ngOnInit() {
        this.courseService.getCourse().subscribe(res => {
            this.course = res;
            this.isLoading = false;
        });
    }

    onSubmit() {
        if (!this.editForm.valid){
            return;
        }
        this.isLoading = true;
        const observer = {
            next: (x) => {
                if (x.message !== null) {
                    this.dialogRef.close({ data: x.message });
                }
                this.isLoading = false;
            },
            error: err => {
                console.error(err);
                this.isLoading = false;
            }
        };

        if (this.data.mode === 'edit') {
            this.standardService.postEditStandard(this.editForm.value, this.data.standard.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            console.log(this.editForm.value);
            this.standardService.postAddStandard(this.editForm.value)
                .subscribe(observer);
        }
    }

    closeDialog(){
        this.dialogRef.close();
    }
}



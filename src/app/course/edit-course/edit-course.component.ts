import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService, StandardService } from 'src/app/core/dataService';
import { BatchService } from 'src/app/core/dataService/batch/batch.services';

@Component({
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {

    private editForm: FormGroup;
    public batch: object;
    public isLoading = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { course: any, mode: string },
        private dialogRef: MatDialogRef<EditCourseComponent>,
        private formBuilder: FormBuilder,
        private batchService: BatchService,
        private courseService: CourseService) {
        this.editForm = formBuilder.group({
            name: [, [Validators.required]],
            //batchId: ['', [Validators.required]],
            isActive: [false, [Validators.required]],
            description: ['', [Validators.required]]
        });
        if (data.mode === 'edit') {
            this.editForm.controls.name.setValue(data.course.name);
            //this.editForm.controls.batchId.setValue(data.course.batchId);
            this.editForm.controls.isActive.setValue(data.course.isActive);
            this.editForm.controls.description.setValue(data.course.description);
        }
    }
    ngOnInit() {
        this.batchService.getAdminBatch().subscribe(res => {
            this.batch = res;
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
            this.courseService.postEditCours(this.editForm.value, this.data.course.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            this.courseService.postAddCourse(this.editForm.value)
                .subscribe(observer);
        }
    }

    closeDialog(){
        this.dialogRef.close();
    }
}



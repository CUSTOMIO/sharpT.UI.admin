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

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { course: any, mode: string },
        private dialogRef: MatDialogRef<EditCourseComponent>,
        private formBuilder: FormBuilder,
        private batchService: BatchService,
        private courseService: CourseService) {
        this.editForm = formBuilder.group({
            name: [, [Validators.required]],
            batchId: ['', [Validators.required]],
            isActive: [false, [Validators.required]],
            description: ['', [Validators.required]]
        })
        if (data.mode === 'edit') {
            this.editForm.get('name').setValue(data.course.name);
            this.editForm.controls['batchId'].setValue(data.course.coursesBatchId.id);
            this.editForm.get('isActive').setValue(data.course.isActive);
            this.editForm.get('description').setValue(data.course.description);
        }
    }
    ngOnInit() {
        const observer = {
            next: (x) => {
                this.batch = x;
            },
            error: err => console.error('Observer got an error: ' + err)
        };
        this.batchService.getAdminBatch().subscribe(observer)
    }

    onSubmit() {
        console.log(this.editForm.value)
        if(!this.editForm.valid){
            return
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
            this.courseService.postEditCours(this.editForm.value, this.data.course.id)
                .subscribe(observer)
        }
        else if (this.data.mode === 'new') {
            this.courseService.postAddCourse(this.editForm.value)
                .subscribe(observer)
        }
    }

    closeDialog(){
        this.dialogRef.close()
    }
}



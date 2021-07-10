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

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { standard: any, mode: string },
        private dialogRef: MatDialogRef<EditStandardComponent>,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private standardService: StandardService) {
        this.editForm = formBuilder.group({
            name: [, [Validators.required]],
            courseId: ['', [Validators.required]],
            isActive: ['', [Validators.required]],
            description: ['', [Validators.required]]
        })
        if (data.mode === 'edit') {
            this.editForm.get('name').setValue(data.standard.name);
            this.editForm.controls['courseId'].setValue(data.standard.standardCourseId.id);
            this.editForm.get('isActive').setValue(data.standard.isActive);
            this.editForm.get('description').setValue(data.standard.description);
        }
    }
    ngOnInit() {
        const observer = {
            next: (x) => {
                this.course = x;
            },
            error: err => console.error('Observer got an error: ' + err)
        };
        this.courseService.getCourse().subscribe(observer)
    }

    onSubmit() {
        const observer = {
            next: (x) => {
                if (x.message !== null) {
                    this.dialogRef.close({ data: x.message });
                }
            },
            error: err => console.error('Observer got an error: ' + err)
        };
        
        if (this.data.mode === 'edit') {
            this.standardService.postEditStandard(this.editForm.value, this.data.standard.id)
                .subscribe(observer)
        }
        else if (this.data.mode === 'new') {
            this.standardService.postAddStandard(this.editForm.value)
                .subscribe(observer)
        }
    }
}



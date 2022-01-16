import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService, StandardService } from 'src/app/core/dataService';
import { BatchService } from '../../core/dataService/batch/batch.services';
import { environment } from 'src/environments/environment';


@Component({
    templateUrl: './edit-standard.component.html',
    styleUrls: ['./edit-standard.component.scss'],
})
export class EditStandardComponent implements OnInit {

    public editForm: FormGroup;
    public course: object;
    public batch: any;
    public isLoading = true;
    public imageURL: string;
    public apiEndpoint: any = environment.api_endpoint;



    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { standard: any, mode: string },
        private dialogRef: MatDialogRef<EditStandardComponent>,
        private formBuilder: FormBuilder,
        private courseService: CourseService,
        private standardService: StandardService,
        private batchService: BatchService) {
        this.editForm = formBuilder.group({
            name: [, [Validators.required]],
            courseId: ['', [Validators.required]],
            isActive: [false, [Validators.required]],
            allowSubjectSelection: [false, [Validators.required]],
            description: ['', [Validators.required]],
            rate: ['', [Validators.required]],
            image: ['', [Validators.required]],
            batches: this.formBuilder.array([], Validators.required)
        });

    }
    ngOnInit() {
        this.courseService.getCourse().subscribe(res => {
            this.course = res;
            this.isLoading = false;
        });
      this.batchService.getAdminBatch()
        .subscribe(res => {
          this.batch = res;
          this.autoPopulateForm();
        })

    }

    get t() { return this.editForm.controls.batches as FormArray; }

  autoPopulateForm() {
    if (this.data.mode === 'edit') {
      this.editForm.controls.name.setValue(this.data.standard.name);
      this.editForm.controls.courseId.setValue(this.data.standard.courseId);
      this.editForm.controls.isActive.setValue(this.data.standard.isActive);
      this.editForm.controls.allowSubjectSelection.setValue(this.data.standard.allowSubjectSelection);
      this.editForm.controls.description.setValue(this.data.standard.description);
      this.editForm.controls.rate.setValue(this.data.standard.rate);
      if (this.data.standard.image) {
        this.editForm.controls.rate.setValue(this.data.standard.image);
      }
      this.editForm.controls.rate.setValue(this.data.standard.rate);
      for (let b of this.data.standard.batches) {
        (this.editForm.controls.batches as FormArray).
          push(this.patchValues(b.batchId));
        //this.batch.splice(this.batch.findIndex(data => data.id === b.batchId), 1)
        //this.batch = this.batch.filter((item) => item.id !== b.batchId);
      }
    }
  }

  removeBatch(batchId: number) {
    console.log(batchId, (this.editForm.controls.batches as FormArray).value.findIndex(b => b.batchId === batchId));
    (this.editForm.controls.batches as FormArray)
      .removeAt(batchId);
  }
  addBatch() {
    (this.editForm.controls.batches as FormArray).
      push(this.patchValues(0));
  }

  public showPreview(event) {
    if ((event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const pattern = /image-*/;

      if (!file.type.match(pattern)) {
        alert('Invalid format');
        return;
      }
      this.editForm.get('image').setValue(file);
      this.editForm.get('image').updateValueAndValidity();
      const reader = new FileReader();

      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log(this.editForm.controls.batches.value);
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

    const fd = new FormData();

    //name: [, [Validators.required]],
    //  courseId: ['', [Validators.required]],
    //    isActive: [false, [Validators.required]],
    //      allowSubjectSelection: [false, [Validators.required]],
    //        description: ['', [Validators.required]],
    //          rate: ['', [Validators.required]],
    //            image: ['', [Validators.required]],
    //              batches: this.formBuilder.array([], Validators.required)

    fd.append('image', this.editForm.controls.image.value);
    fd.append('name', this.editForm.controls.name.value);
    fd.append('courseId', this.editForm.controls.courseId.value);
    fd.append('allowSubjectSelection', this.editForm.controls.allowSubjectSelection.value);
    fd.append('description', this.editForm.controls.description.value);
    fd.append('rate', this.editForm.controls.rate.value);
    fd.append('batches', JSON.stringify(this.editForm.controls.batches.value));
    fd.append('isActive', this.editForm.controls.isActive.value);

    if (this.data.mode === 'edit') {
          console.log('edit')
      this.standardService.postEditStandard(fd, this.data.standard.id)
                .subscribe(observer);
        }
        else if (this.data.mode === 'new') {
            this.standardService.postAddStandard(this.editForm.value)
                .subscribe(observer);
        }
  }

  public patchValues(id: number) {
    return this.formBuilder.group({
      batchId: [id]
    });
  }

    closeDialog(){
        this.dialogRef.close();
    }
}



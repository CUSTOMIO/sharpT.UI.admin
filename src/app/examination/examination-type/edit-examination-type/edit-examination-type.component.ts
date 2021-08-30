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
  public isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { examinationType: any, mode: string },
    private dialogRef: MatDialogRef<EditExaminationTypeComponent>,
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService) {
    this.editForm = formBuilder.group({
      name: [, [Validators.required]],
      isActive: [, [Validators.required]]
    });
    if (data.mode === 'edit') {
      this.editForm.get('name').setValue(data.examinationType.name);
      this.editForm.get('isActive').setValue(data.examinationType.isActive);
    }
  }
  ngOnInit() {
    this.isLoading = false;
  }

  onSubmit() {
    console.log('Clicked')
    if (!this.editForm.valid) {
      return;
    }
    console.log('Passed')
    this.isLoading = true;
    const observer = {
      next: (x) => {
        if (x.message) {
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
      this.examinationService.postEditExamination(this.editForm.value, this.data.examinationType.id)
        .subscribe(observer);
    }
    else if (this.data.mode === 'new') {
      this.examinationService.postAddExamination(this.editForm.value)
        .subscribe(observer);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}



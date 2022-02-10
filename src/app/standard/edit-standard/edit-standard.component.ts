import { Component, OnInit, Inject, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService, StandardService, SubjectService } from 'src/app/core/dataService';
import { BatchService } from '../../core/dataService/batch/batch.services';
import { environment } from 'src/environments/environment';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  templateUrl: './edit-standard.component.html',
  styleUrls: ['./edit-standard.component.scss'],
})
export class EditStandardComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredStandards: Observable<string[]>

  public editForm: FormGroup;
  public course: object;
  public subjects: any;
  public batch: any;
  public isLoading = true;
  public imageURL: string;
  public apiEndpoint: any = environment.api_endpoint;

  @ViewChild('standardInput') standardInput: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { standard: any, mode: string, standardRates: any },
    private dialogRef: MatDialogRef<EditStandardComponent>,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private standardService: StandardService,
    private batchService: BatchService,
    private subjectService: SubjectService) {
    this.editForm = formBuilder.group({
      name: [, [Validators.required]],
      courseId: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
      allowSubjectSelection: [false, [Validators.required]],
      description: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      image: ['', [Validators.required]],
      batches: this.formBuilder.array([], Validators.required),
      standardRates: formBuilder.array([])
    });
    this.filteredStandards = this.s.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.subjects.data.slice())),
    );
  }
  ngOnInit() {
    this.subjectService.getSubjectByStandardId(this.data.standard.id)
      .subscribe(result => {
        this.subjects = result;
      })
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
  get s() { return this.editForm.controls.standardRates as FormArray; }
  subjectControl(iterator: number){ return this.s.controls }
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
          push(this.patchBatchValues(b.batchId));
      }
      if (this.data.standardRates.length != 0) {
        for (let s of this.data.standardRates) {
          (this.editForm.controls.standardRates as FormArray).
            push(this.patchStandardRateValues(s));
        }
      }
    }
  }

  removeBatch(batchId: number) {
    (this.editForm.controls.batches as FormArray)
      .removeAt(batchId);
  }

  addBatch() {
    (this.editForm.controls.batches as FormArray).
      push(this.patchBatchValues(0));
  }

  removePackage(id: number) {
    (this.editForm.controls.standardRates as FormArray)
      .removeAt(id);
  }
  removeSubject(subject: any, i: number) {
    const index = this.s.value[i].subjects.indexOf(subject);

    if (index >= 0) {
      this.s.value[i].subjects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, i: number): void {
    this.s.value[i].subjects.push({
      subjectName: this.getSubjectName(event.option.value),
      subjectId: event.option.value
    });
    this.standardInput.nativeElement.value = '';
  }

  add(event: MatChipInputEvent, i: number): void {
    const value = (event.value || '').trim();

    if (value) {
      this.s.value[i].subjects.push(this.patchSubject(value, this.getSubjectId(value)));
    }
  }
  patchSubject(name: string, id: number) {
    return this.formBuilder.group({
      subjectName: name,
      subjectId: id
    });
  }

  getSubjectId(subjectName: string) {
    if (this.subjects.data.filter(s => s.name === subjectName).length !== 0) {
      return this.subjects.data.filter(s => s.name === subjectName)[0].id;
    }
    return null;
  }

  getSubjectName(subjectId: number) {
    if (this.subjects.data.filter(s => s.id === subjectId).length !== 0) {
      return this.subjects.data.filter(s => s.id === subjectId)[0].name;
    }
    return null;
  }

  addPackage() {
    this.s.push(this.patchStandardRateValues({}))
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
    if (!this.editForm.valid) {
      return;
    }
    this.isLoading = true;
    const observer = {
      next: (x) => {
        if (x.message !== null) {
          this.dialogRef.close({ data: x.message, mode: this.data.mode });
        }
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
      }
    };

    const fd = new FormData();
    fd.append('image', this.editForm.controls.image.value);
    fd.append('name', this.editForm.controls.name.value);
    fd.append('courseId', this.editForm.controls.courseId.value);
    fd.append('allowSubjectSelection', this.editForm.controls.allowSubjectSelection.value);
    fd.append('description', this.editForm.controls.description.value);
    fd.append('rate', this.editForm.controls.rate.value);
    fd.append('batches', JSON.stringify(this.editForm.controls.batches.value));
    fd.append('standardRates', JSON.stringify(this.editForm.controls.standardRates.value));
    fd.append('isActive', this.editForm.controls.isActive.value);

    if (this.data.mode === 'edit') {
      this.standardService.postEditStandard(fd, this.data.standard.id)
        .subscribe(observer);
    }
    else if (this.data.mode === 'new') {
      this.standardService.postAddStandard(fd)
        .subscribe(observer);
    }
  }

  public patchBatchValues(id: number) {
    return this.formBuilder.group({
      batchId: [id]
    });
  }

  public patchStandardRateValues(s: any){ 
    if(Object.keys(s).length === 0){
      return this.formBuilder.group({
        id: [''],
        standardId: [this.data.standard.id],
        rate: [''],
        standardName: [this.data.standard.name],
        subjects: [[]]
      })
    } 
    return this.formBuilder.group({
      id: [s.id],
      standardId: [s.standardId],
      rate: [s.rate],
      standardName: [s.standardName],
      subjects: [s.subjects]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  };

  private _filter(value: string): string[] {
    if(typeof value == 'string') {
      const filterValue = value.toLowerCase();
      return this.subjects.data.filter(s => s.toLowerCase().includes(filterValue));
    }
  };

}

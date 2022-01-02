import { Component, OnInit, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { StandardService, SubjectService, UserService } from 'src/app/core/dataService';
import { Subject, UserSubject } from 'src/app/core/model';
import { UserDetailService } from '../../detail.service';

@Component({
  selector: 'app-user-standard-tab-details',
  templateUrl: './user-standard-tab-details.component.html',
  styleUrls: ['./user-standard-tab-details.component.scss'],
})

export class UserStandardTabComponent implements OnInit {

  public standard: string;
  public standardForm: FormGroup;
  public userStandardId: number;
  public standards: object;
  public subjects: any;
  public userSubjects: Array<UserSubject>;

  public isLoading = true;
  public isSubmitting = false;

  constructor(private userDetailService: UserDetailService,
              private standardService: StandardService,
              private formBuilder: FormBuilder,
              private subjectService: SubjectService,
              private userService: UserService,
              private route: ActivatedRoute
  ) {
    this.standardForm = this.formBuilder.group({
      standardId: ['', [Validators.required]],
      subjects: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnInit() {
    this.standardService.getStandard()
      .subscribe(data => {
        this.standards = data;
      });
    this.userDetailService.userStandard
      .subscribe(res => {
        if (res) {
          this.userStandardId = res.id;
          this.getSubjects(this.userStandardId);
          this.standardForm.get('standardId').setValue(this.userStandardId);
        }
      });
    this.userDetailService.userSubject
      .subscribe(res => {
        if (res) {
          this.userSubjects = res;
          for (const item of this.userSubjects) {
            (this.standardForm.controls.subjects as FormArray).
              push(this.patchValues(item.subjectId, item.name));
          }
        }
      });
  }

  getSubjects(standardId: number) {
    (this.standardForm.controls.subjects as FormArray).clear();
    this.subjectService.getSubjectByStandardId(standardId)
      .subscribe(res => {
        this.subjects = res;
        if (!this.subjects.allowSubjectSelection){
          for (const item of this.subjects.data) {
            (this.standardForm.controls.subjects as FormArray).
              push(this.patchValues(item.id, item.name));
          }
        }
        this.isLoading = false;
      });
  }

  public checkSubject(event: MatSlideToggleChange, item: Subject) {
    if (event.checked) {
      (this.standardForm.controls.subjects as FormArray)
        .push(this.patchValues(item.id, item.name));
    }
    else {
      (this.standardForm.controls.subjects as FormArray)
        .removeAt(
          this.standardForm.controls.subjects.value.findIndex((x, id) => {
            return x.id === item.id;
          })
        );
    }
  }
  public patchValues(id: number, name: string) {
    return this.formBuilder.group({
      id: [id],
      name: [name]
    });
  }

  checkSubjectToggle(subject: any) {
    for (const item of this.userSubjects) {
      if (subject.id === item.subjectId) {
        return true;
      }
    }
  }

  onSubmit() {
    this.isSubmitting = true;
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.postUserStandard(this.standardForm.value, userId)
    .subscribe(res => {
      this.isSubmitting = false;
    });
  }
}

import { Component, OnInit, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { StandardService, SubjectService } from 'src/app/core/dataService';
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
    public subjects: object;
    public userSubjects: Array<UserSubject>;


    constructor(private userService: UserDetailService,
                private standardService: StandardService,
                private formBuilder: FormBuilder,
                private subjectService: SubjectService
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
        this.userService.userStandard
            .subscribe(res => {
                if (res) {
                    this.userStandardId = res.id;
                    this.getSubjects(this.userStandardId);
                    this.standardForm.get('standardId').setValue(this.userStandardId);
                }
            });
        this.userService.userSubject
            .subscribe(res => {
                if (res) {
                    this.userSubjects = res;
                    (this.standardForm.controls.subjects as FormArray).clear();
                    for (const item of this.userSubjects) {
                        (this.standardForm.controls.subjects as FormArray).
                            push(this.patchValues(item.subjectId, item.name));
                    }
                }
            });
    }

    getSubjects(standardId: number) {
        console.log('triggered', standardId);
        this.subjectService.getSubjectByStandardId(standardId)
            .subscribe(res => {
                this.subjects = res;
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

    checkUserSubject(subject: any) {
        for (let item of this.userSubjects) {
            if (subject.id === item.subjectId) {
                return true;
            }
        }
    }

    changeStandard(standard){
        this.subjectService.getSubjectByStandardId(standard.value);

    }

    onSubmit() {
        console.log(this.standardForm.value);
    }
}

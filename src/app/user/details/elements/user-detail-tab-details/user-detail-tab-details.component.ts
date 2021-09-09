import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/dataService';
import { UserDetailService } from '../../detail.service';

@Component({
    selector: 'app-user-detail-tab-details',
    templateUrl: './user-detail-tab-details.component.html',
    styleUrls: ['./user-detail-tab-details.component.scss'],
})

export class UserDetailTabComponent implements OnInit {

    public firstName: string;
    public middleName: string;
    public lastName: string;
    public parentPN: bigint;
    public studentPN: bigint;
    public address: string;

    public detailForm: FormGroup;
    public isLoading = true;

    constructor(private userDetailService: UserDetailService,
                private formBuilder: FormBuilder,
                private userService: UserService,
                private route: ActivatedRoute) {
        this.detailForm = this.formBuilder.group({
            firstName: [, [Validators.required]],
            middleName: [, [Validators.required, this.whitespaceValidator]],
            lastName: [, [Validators.required, this.whitespaceValidator]],
            address: ['', [Validators.required, this.whitespaceValidator]],
            studentPN: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
            parentPN: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
        });
    }

    ngOnInit() {
        this.userDetailService.userName
            .subscribe(res => {
                if (res) {
                    this.firstName = res.firstName;
                    this.middleName = res.middleName;
                    this.lastName = res.lastName;
                    this.detailForm.controls.firstName.setValue(res.firstName);
                    this.detailForm.controls.lastName.setValue(res.lastName);
                    this.detailForm.controls.middleName.setValue(res.middleName);

                }
            });
        this.userDetailService.userPN
            .subscribe(res => {
                if (res) {
                    this.studentPN = res;
                    this.detailForm.controls.studentPN.setValue(res);

                }
            });
        this.userDetailService.userPPN
            .subscribe(res => {
                if (res) {
                    this.parentPN = res;
                    this.detailForm.controls.parentPN.setValue(res);

                }
            });
        this.userDetailService.userAddress
            .subscribe(res => {
                if (res) {
                    this.address = res;
                    this.detailForm.controls.address.setValue(res);
                    this.isLoading = false;
                }
            });
    }

    public whitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
      }

    onSubmit() {
        const userId = Number(this.route.snapshot.paramMap.get('id'));
        this.userService.postUserData(this.detailForm.value, userId)
        .subscribe(res => {
            console.log(res);
        });
    }
}



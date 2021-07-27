import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    constructor(private userService: UserDetailService,
        private formBuilder: FormBuilder) {
        this.detailForm = this.formBuilder.group({
            firstName: [, [Validators.required]],
            middleName: [, [Validators.required]],
            lastName: [, [Validators.required]],
            address: ['', [Validators.required]],
            studentPN: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
            parentPN: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]]
        });
    }

    ngOnInit() {
        this.userService.userName
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
        this.userService.userPN
            .subscribe(res => {
                if (res) {
                    this.studentPN = res;
                    this.detailForm.controls.studentPN.setValue(res);

                }
            });
        this.userService.userPPN
            .subscribe(res => {
                if (res) {
                    this.parentPN = res;
                    this.detailForm.controls.parentPN.setValue(res);

                }
            });
        this.userService.userAddress
            .subscribe(res => {
                if (res) {
                    this.address = res;
                    this.detailForm.controls.address.setValue(res);

                }
            });


    }

    onSubmit() {
        console.log(this.detailForm.value);
    }
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExaminationDetailService, StandardService, UserService } from '../core/dataService';
import {  ExaminationDetailBySId, Standard, UserByStandardId } from '../core/model';

@Component({
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    public standard: Standard[];
    public examinationDetail: ExaminationDetailBySId[];
    public user: UserByStandardId[];
    // private initialStandardId = 1;
    constructor(private standardService: StandardService,
                private userService: UserService,
                private examinationService: ExaminationDetailService) {
    }

    ngOnInit() {
        this.standardService.getStandard()
        .subscribe(res => {
            this.standard = res;
        });
    }

    getUser(result){
        this.userService.getUserBySId(5, 1, result)
        .subscribe(res => {
            this.user = res;
            console.log(this.user);
        });
    }

    getExaminationDetail(result){
        this.examinationService.getExaminationDetailBySId(result)
        .subscribe(res => {
            this.examinationDetail = res;
            // console.log(this.examinationDetail);
        });
        this.getUser(result);
    }
}

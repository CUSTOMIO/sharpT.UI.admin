import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/dataService';
import { UserDetailService } from 'src/app/user/details/detail.service';
import { environment } from 'src/environments/environment';
import { EditUserPhotoComponent } from '../edit-user-photo/edit-user-photo.component';

@Component({
    selector: 'app-user-detail-header',
    templateUrl: './user-detail-header.component.html',
    styleUrls: ['./user-detail-header.component.scss'],
})
export class UserDetailHeaderComponent implements OnInit {

    public userId: number;
    public apiEndpoint: any = environment.api_endpoint;
    public imageUrl: string;
    public firstName: string;
    public middleName: string;
    public email: string;
    public studentPN: bigint;
    public address: string;
    public userStatus: boolean;

    public isLoading = true;

    constructor(private userDetailService: UserDetailService,
                private userService: UserService,
                public dialog: MatDialog,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.userId = Number(this.route.snapshot.paramMap.get('id'));
        this.userDetailService.userStatus
        .subscribe(res => {
                this.userStatus = res;
            }
        );
        this.userDetailService.userImage
            .subscribe(res => {
                this.imageUrl = res;
            });
        this.userDetailService.userName
            .subscribe(res => {
                if (res) {
                    this.firstName = res.firstName;
                    this.middleName = res.middleName;
                }
            });
        this.userDetailService.userEmail
        .subscribe(res => {
            if (res) {
                this.email = res;
            }
        });
        this.userDetailService.userPN
        .subscribe(res => {
            if (res) {
                this.studentPN = res;
            }
        });
        this.userDetailService.userAddress
        .subscribe(res => {
            if (res) {
                this.address = res;
            }
            this.isLoading = false;
        });

    }

    verifyUser(){
        if (confirm('Are you sure, you want to verify ' + this.firstName + ' ' + this. middleName)) {
            this.userService.postVerifyUser(this.userId)
            .subscribe(res => {
                console.log(res);
            });
          }
    }

    openDialog(){
        const dialogRef = this.dialog.open(EditUserPhotoComponent, {
            // disableClose: true,
            width: '450px',
            data: {
                userId: this.userId,
                imageUrl: this.imageUrl
            }
          });
    }
}



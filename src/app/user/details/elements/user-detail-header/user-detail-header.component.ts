import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from 'src/app/user/details/detail.service';
import { environment } from 'src/environments/environment';

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

    public isLoading = true;

    constructor(private userService: UserDetailService) { }

    ngOnInit() {
        this.userService.userImage
            .subscribe(res => {
                this.imageUrl = res;
            });
        this.userService.userName
            .subscribe(res => {
                if (res) {
                    this.firstName = res.firstName;
                    this.middleName = res.middleName;
                }
            });
        this.userService.userEmail
        .subscribe(res => {
            if (res) {
                this.email = res;
            }
        });
        this.userService.userPN
        .subscribe(res => {
            if (res) {
                this.studentPN = res;
            }
        });
        this.userService.userAddress
        .subscribe(res => {
            if (res) {
                this.address = res;
            }
        });
        this.isLoading = false;
    }
}



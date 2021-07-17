import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/dataService';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit{
    
    public userId : number;
    public userDetail : any;
    public apiEndpoint: any = environment.api_endpoint

    constructor(private activatedRoute: ActivatedRoute, 
        private userService: UserService){}

    ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
        this.userId = params.id;
      });
    
      const observer = {
        next: (x) => {
          this.userDetail = x;
          console.log(this.userDetail)
        },
        error: err => console.error('Observer got an error: ' + err)
      }; 
    this.userService.getUsersById(this.userId).subscribe(observer);
    }
}



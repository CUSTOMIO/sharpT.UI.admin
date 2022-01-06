import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailService } from './detail.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './detail.component.html'
})

export class UserDetailComponent implements OnInit, AfterViewInit {
    public isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private userDetailService: UserDetailService
    ) { }

    ngOnInit() {
        const userId = Number(this.route.snapshot.paramMap.get('id'));
        this.userDetailService.getUser(userId);
  }
  ngAfterViewInit() {
    this.isLoading = false;
  }
}



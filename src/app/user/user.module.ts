import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { routedComponents, HomeRoutingModule } from './user.routing';
import { UserDetailService } from './details/detail.service';
import { UserDetailHeaderComponent } from './details/elements/user-detail-header/user-detail-header.component';
import { UserDetailTabComponent } from './details/elements/user-detail-tab-details/user-detail-tab-details.component';
import { UserDetailComponent } from './details/detail.component';
import { UserStandardTabComponent } from './details/elements/user-standard-tab-details/user-standard-tab-details.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    UserDetailComponent,
    UserDetailTabComponent,
    UserDetailHeaderComponent,
    UserStandardTabComponent
  ],
  providers: [
    UserDetailService
  ]
})

export class UserModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { routedComponents, HomeRoutingModule } from './user-routing.module';
import { UserHeaderComponent } from './elements/user-header/user-header.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    UserHeaderComponent
  ],
  providers: [
  ]
})

export class UserModule { }


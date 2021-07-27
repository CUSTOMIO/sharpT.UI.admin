import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, routedComponents } from './otp.routing';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
  ]
})

export class OtpModule { }


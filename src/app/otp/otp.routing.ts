import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { OtpComponent } from './otp.component';

const routes: Routes = [
  {
    path: '',
    component: OtpComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }

export const routedComponents = [
    OtpComponent
];


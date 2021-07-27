import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { ExaminationDetailComponent } from './examination-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationDetailComponent,
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
export class ExaminationDetailRoutingModule { }

export const routedComponents = [
    ExaminationDetailComponent
];


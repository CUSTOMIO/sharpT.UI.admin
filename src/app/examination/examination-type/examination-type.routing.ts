import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { ExaminationTypeComponent } from './examination-type.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationTypeComponent,
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
export class ExaminationTypeRoutingModule { }

export const routedComponents = [
    ExaminationTypeComponent
];


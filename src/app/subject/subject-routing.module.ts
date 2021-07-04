import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { SubjectComponent } from './subject.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
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
  SubjectComponent
];


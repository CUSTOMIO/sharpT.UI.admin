import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditResultComponent } from './edit-result/edit-result.component';

// Views
import { ResultComponent } from './result.component';

const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
  },
  {
    path: ':userId',
    component: EditResultComponent,
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
export class ResultRoutingModule { }

export const routedComponents = [
    ResultComponent
];


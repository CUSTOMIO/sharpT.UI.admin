import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { NoticeComponent } from './notice.component';

const routes: Routes = [
  {
    path: '',
    component: NoticeComponent,
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
export class NoticeRoutingModule { }

export const routedComponents = [
    NoticeComponent
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { ReachUsComponent } from './reach-us.component';

const routes: Routes = [
  {
    path: '',
    component: ReachUsComponent,
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
export class ReachUsRoutingModule { }

export const routedComponents = [
    ReachUsComponent
];


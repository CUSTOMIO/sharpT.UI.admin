import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { StandardComponent } from './standard.component';

const routes: Routes = [
  {
    path: '',
    component: StandardComponent,
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
    StandardComponent
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHeaderComponent } from './elements/user-header/user-header.component';

// Views
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: ':id',
    component: UserHeaderComponent,
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
    UserComponent
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './details/detail.component';

// Views
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: ':id',
    component: UserDetailComponent,
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
  UserListComponent
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/dataService/auth.gaurd';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'subject',
    component: LayoutComponent,
    children: [{ path: '', loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)}],
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/dataService/auth.gaurd';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'subject',
    component: LayoutComponent,
    children: [{ path: '', loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)}],
    canActivate: [AuthGuard],
  },
  {
    path: 'standard',
    component: LayoutComponent,
    children: [{ path: '', loadChildren: () => import('./standard/standard.module').then(m => m.StandardModule)}],
    canActivate: [AuthGuard],
  },
  {
    path: 'course',
    component: LayoutComponent,
    children: [{ path: '', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)}],
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [{ path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}],
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

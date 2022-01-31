import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { TestimonialComponent } from './testimonial.component';

const routes: Routes = [
  {
    path: '',
    component: TestimonialComponent,
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
export class TestimonialRoutingModule { }

export const routedComponents = [
  TestimonialComponent
];


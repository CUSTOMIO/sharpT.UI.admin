import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TestimonialRoutingModule, routedComponents } from './testimonial.routing';
// import { EditSubjectComponent } from './edit-subject/edit-subject.component';


@NgModule({
  imports: [
    CommonModule,
    TestimonialRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    // EditSubjectComponent
  ],
  providers: [
  ]
})

export class TestimonialModule { }


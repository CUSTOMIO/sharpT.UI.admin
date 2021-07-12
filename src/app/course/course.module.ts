import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, routedComponents } from './course-routing.module';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    EditCourseComponent
  ],
  providers: [
  ]
})

export class CourseModule { }


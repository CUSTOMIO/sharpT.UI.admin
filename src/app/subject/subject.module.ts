import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule, routedComponents } from './subject-routing.module';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    EditSubjectComponent
  ],
  providers: [
  ]
})

export class SubjectModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule, routedComponents } from './subject-routing.module';
import { SubjectComponent } from './subject.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
  ],
  providers: [
  ]
})

export class SubjectModule { }


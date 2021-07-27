import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ExaminationTypeRoutingModule, routedComponents } from './examination-type.routing';
import { EditExaminationTypeComponent } from './edit-examination-type/edit-examination-type.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExaminationTypeRoutingModule
  ],
  declarations: [
    routedComponents,
    EditExaminationTypeComponent
  ],
  providers: [
  ]
})

export class ExaminationTypeModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ExaminationDetailRoutingModule, routedComponents } from './examination-detail.routing';
import { EditExaminationDetailComponent } from './edit-examination-detail/edit-examination-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExaminationDetailRoutingModule
  ],
  declarations: [
    routedComponents,
    EditExaminationDetailComponent
  ],
  providers: [
  ]
})

export class ExaminationDetailModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule, routedComponents } from './result.routing';
import { EditResultComponent } from './edit-result/edit-result.component';

@NgModule({
  imports: [
    CommonModule,
    ResultRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    EditResultComponent
  ],
  providers: [
  ]
})

export class ResultModule { }


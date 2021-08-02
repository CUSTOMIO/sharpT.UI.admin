import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule, routedComponents } from './result.routing';

@NgModule({
  imports: [
    CommonModule,
    ResultRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
  ]
})

export class ResultModule { }


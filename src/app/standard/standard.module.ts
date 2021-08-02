import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StandardRoutingModule, routedComponents } from './standard-routing.module';
import { EditStandardComponent } from './edit-standard/edit-standard.component';


@NgModule({
  imports: [
    CommonModule,
    StandardRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    EditStandardComponent
  ],
  providers: [
  ]
})

export class StandardModule { }


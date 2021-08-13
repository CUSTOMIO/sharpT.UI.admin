import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReachUsRoutingModule, routedComponents } from './reach-us.routing';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReachUsRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
  ]
})

export class ReachUsModule { }


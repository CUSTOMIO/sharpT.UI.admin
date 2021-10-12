import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NoticeRoutingModule, routedComponents } from './notice.routing';
import { EditNoticeComponent } from './edit-notice/edit-notice.component';


@NgModule({
  imports: [
    CommonModule,
    NoticeRoutingModule,
    SharedModule
  ],
  declarations: [
    EditNoticeComponent,
    routedComponents
  ],
  providers: [
  ]
})

export class NoticeModule { }


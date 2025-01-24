import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeMailboxRoutingModule } from './office-mailbox-routing.module';
import { OfficeMailboxComponent } from './office-mailbox.component';
import { OutlookMailModule } from '../outlook-mail/outlook-mail.module';


@NgModule({
  declarations: [OfficeMailboxComponent],
  imports: [
    CommonModule,
    OfficeMailboxRoutingModule, OutlookMailModule
  ]
})
export class OfficeMailboxModule { }

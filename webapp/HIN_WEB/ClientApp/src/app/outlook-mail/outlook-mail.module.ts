import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlookMailComponent } from './outlook-mail.component';
import { Connectoffice365Module } from '../connectoffice365/connectoffice365.module';
import { TruncatePipe } from '../helper/truncate-pipe';
import { SharedmoduleModule } from '../helper/sharedmodule/sharedmodule.module';
import { ComposeemailModule } from '../composeemail/composeemail.module';



@NgModule({
  declarations: [OutlookMailComponent],
  imports: [
    CommonModule, Connectoffice365Module, SharedmoduleModule,ComposeemailModule
  ],
  exports: [OutlookMailComponent]
})
export class OutlookMailModule { }

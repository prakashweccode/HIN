import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaskModule } from 'ngx-mask';
import { SignpadModule } from '../signpad/signpad.module';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule, FormsModule, ReactiveFormsModule, DirectiveHelperModule, SignpadModule, AngularEditorModule, NgxEditorModule, NgxMaskModule
  ]
})
export class SettingsModule { }

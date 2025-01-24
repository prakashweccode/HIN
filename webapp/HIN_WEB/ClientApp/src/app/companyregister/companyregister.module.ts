import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyregisterRoutingModule } from './companyregister-routing.module';
import { CompanyregisterComponent } from './companyregister.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { CustomstringdropdownModule } from '../customstringdropdown/customstringdropdown.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [CompanyregisterComponent],
  imports: [
    CommonModule,
    CompanyregisterRoutingModule,
    FormsModule, ReactiveFormsModule, DirectiveHelperModule, CustomdropdownModule, CustomstringdropdownModule,NgxMaskModule
  ]
})
export class CompanyregisterModule { }

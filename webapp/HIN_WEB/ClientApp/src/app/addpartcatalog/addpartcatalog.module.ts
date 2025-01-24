import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpartcatalogRoutingModule } from './addpartcatalog-routing.module';
import { AddpartcatalogComponent } from './addpartcatalog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { CustomdropdownModule } from '../customdropdown/customdropdown.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [AddpartcatalogComponent],
  imports: [
    CommonModule,
    AddpartcatalogRoutingModule, FormsModule, DirectiveHelperModule, ReactiveFormsModule, CustomdropdownModule, NgxMaskModule
  ]
})
export class AddpartcatalogModule { }

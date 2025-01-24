import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcurrencyRoutingModule } from './addcurrency-routing.module';
import { AddcurrencyComponent } from './addcurrency.component';
import { FormsModule } from '@angular/forms';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [AddcurrencyComponent],
  imports: [
    CommonModule,
    AddcurrencyRoutingModule, FormsModule, DirectiveHelperModule
  ]
})
export class AddcurrencyModule { }

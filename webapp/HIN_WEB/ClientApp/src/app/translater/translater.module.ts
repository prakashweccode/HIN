import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslaterRoutingModule } from './translater-routing.module';
import { TranslaterComponent } from './translater.component';


@NgModule({
  declarations: [
    TranslaterComponent
  ],
  imports: [
    CommonModule,
    TranslaterRoutingModule
  ]
})
export class TranslaterModule { }

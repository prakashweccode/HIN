import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    CommonModule, CurrencyComponent]
})
export class CurrencyModule { }

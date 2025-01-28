import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpagehealthinformationComponent } from './landingpagehealthinformation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LandingpagehealthinformationComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ], exports: [LandingpagehealthinformationComponent]
})
export class LandingpagehealthinformationModule { }

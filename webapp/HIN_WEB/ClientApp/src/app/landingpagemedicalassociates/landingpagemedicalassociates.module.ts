import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpagemedicalassociatesComponent } from './landingpagemedicalassociates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LandingpagemedicalassociatesComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ], exports: [LandingpagemedicalassociatesComponent]
})


export class LandingpagemedicalassociatesModule { }

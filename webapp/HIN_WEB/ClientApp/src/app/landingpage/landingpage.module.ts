import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingpageRoutingModule } from './landingpage-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingpagehealthinformationModule } from '../landingpagehealthinformation/landingpagehealthinformation.module';
import { LandingpagemedicalassociatesModule } from '../landingpagemedicalassociates/landingpagemedicalassociates.module';


@NgModule({
  declarations: [LandingpageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LandingpageRoutingModule,
    LandingpagehealthinformationModule,
    LandingpagemedicalassociatesModule
  ]
})
export class LandingpageModule { }

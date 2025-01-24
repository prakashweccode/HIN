import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportsettingsRoutingModule } from './importsettings-routing.module';
import { ImportsettingsComponent } from './importsettings.component';


@NgModule({
  declarations: [ImportsettingsComponent],
  imports: [
    CommonModule,
    ImportsettingsRoutingModule
  ]
})
export class ImportsettingsModule { }

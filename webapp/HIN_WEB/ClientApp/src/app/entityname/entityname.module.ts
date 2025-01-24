import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitynameRoutingModule } from './entityname-routing.module';
import { EntitynameComponent } from './entityname.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EntitynameComponent],
  imports: [
    CommonModule,
    EntitynameRoutingModule, FormsModule, ReactiveFormsModule
  ], exports: [EntitynameComponent]
})
export class EntitynameModule { }

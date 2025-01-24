import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageroleRoutingModule } from './managerole-routing.module';
import { ManageroleComponent } from './managerole.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageroleComponent],
  imports: [
    CommonModule,
    ManageroleRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ManageroleModule { }

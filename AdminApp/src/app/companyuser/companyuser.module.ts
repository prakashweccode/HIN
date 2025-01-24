import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyuserRoutingModule } from './companyuser-routing.module';
import { CompanyuserComponent } from './companyuser.component';
import { PaginationgridModule } from '../paginationgrid/paginationgrid.module';


@NgModule({
  declarations: [
    CompanyuserComponent
  ],
  imports: [
    CommonModule,
    CompanyuserRoutingModule, PaginationgridModule
  ]
})
export class CompanyuserModule { }

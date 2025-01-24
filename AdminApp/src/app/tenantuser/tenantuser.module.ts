import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantuserRoutingModule } from './tenantuser-routing.module';
import { TenantuserComponent } from './tenantuser.component';
import { PaginationgridModule } from '../paginationgrid/paginationgrid.module';


@NgModule({
  declarations: [
    TenantuserComponent
  ],
  imports: [
    CommonModule,
    TenantuserRoutingModule, PaginationgridModule
  ]
})
export class TenantuserModule { }

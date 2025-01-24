import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnedriveExplorerModule } from '../onedrive-explorer/onedrive-explorer.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule, FormsModule, ReactiveFormsModule, OnedriveExplorerModule
  ]
})
export class SearchModule { }

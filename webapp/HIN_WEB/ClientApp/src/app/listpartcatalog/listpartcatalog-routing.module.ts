import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListpartcatalogComponent } from './listpartcatalog.component';

const routes: Routes = [{ path: '', component: ListpartcatalogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListpartcatalogRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpartcatalogComponent } from './addpartcatalog.component';

const routes: Routes = [{ path: '', component: AddpartcatalogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpartcatalogRoutingModule { }

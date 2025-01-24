import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactimportComponent } from './contactimport.component';

const routes: Routes = [{ path: '', component: ContactimportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactimportRoutingModule { }

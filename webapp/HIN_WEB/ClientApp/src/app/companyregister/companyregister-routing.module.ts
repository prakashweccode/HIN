import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyregisterComponent } from './companyregister.component';

const routes: Routes = [{ path: '', component: CompanyregisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyregisterRoutingModule { }

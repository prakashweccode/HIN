import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyuserComponent } from './companyuser.component';

const routes: Routes = [{ path: '', component: CompanyuserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyuserRoutingModule { }

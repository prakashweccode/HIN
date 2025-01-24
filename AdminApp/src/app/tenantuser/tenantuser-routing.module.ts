import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantuserComponent } from './tenantuser.component';

const routes: Routes = [{ path: '', component: TenantuserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantuserRoutingModule { }

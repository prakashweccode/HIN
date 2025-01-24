import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, children:[
  { path: 'company', loadChildren: () => import('../company/company.module').then(m => m.CompanyModule) },
  { path: 'companyuser', loadChildren: () => import('../companyuser/companyuser.module').then(m => m.CompanyuserModule) },
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'add-company', loadChildren: () => import('../add-company/add-company.module').then(m => m.AddCompanyModule), outlet: "sidenav" },
  { path: 'tenantuser', loadChildren: () => import('../tenantuser/tenantuser.module').then(m => m.TenantuserModule) },
  { path: 'paginationgrid', loadChildren: () => import('../paginationgrid/paginationgrid.module').then(m => m.PaginationgridModule) },
  { path: 'edit-company/:id', loadChildren: () => import('../edit-company/edit-company.module').then(m => m.EditCompanyModule), outlet: "sidenav" },
  { path: 'edit-tenant-user/:id/:id2', loadChildren: () => import('../edit-tenant-user/edit-tenant-user.module').then(m => m.EditTenantUserModule), outlet:"sidenav" }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

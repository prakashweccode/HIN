import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';


const routes: Routes = [{ path: '', component: AdminComponent },
{path: 'dashboard', loadChildren: ()=> import('../admin/dashboard/dashboard.module').then((m)=> m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

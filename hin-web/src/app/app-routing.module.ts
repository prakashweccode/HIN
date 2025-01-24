import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';


// const routes: Routes = [
//   {
//     path: 'profile',
//     component: ProfileComponent,
//     canActivate: [MsalGuard]
//   },
//   {
//     path: '',
//     component: HomeComponent
//   },
//   {
//     path: 'login-failed',
//     component: FailedComponent
//   }
// ];
const routes: Routes = [
  {path:'',loadChildren: ()=> import('./home/home.module').then((m)=> m.HomeModule), data:{title:'Login'}},
  {path:'admin', loadChildren:()=> import('./admin/admin.module').then((m)=>m.AdminModule), data:{title:'Admin'}, canActivate:[MsalGuard]}
  // {path:'login',loadChildren: ()=> import('./login/login.module').then((m)=> m.LoginModule), data:{title:'Login'}},
  // { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
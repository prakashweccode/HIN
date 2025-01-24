import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignpadComponent } from './signpad.component';

const routes: Routes = [{ path: '', component: SignpadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignpadRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { RouterModule } from '@angular/router';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';
import { ChartModule } from '../chart/chart.module';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule, SidenavModule, RouterModule.forRoot([{ path: '', component: NavMenuComponent }]), DirectiveHelperModule, ChartModule
  ],
  exports: [NavMenuComponent]
})
export class NavMenuModule { }

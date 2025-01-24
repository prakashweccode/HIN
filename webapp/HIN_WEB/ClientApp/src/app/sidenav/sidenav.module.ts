import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { DirectiveHelperModule } from '../helper/directive/DirectiveHelperModule';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule, DirectiveHelperModule, RouterModule.forRoot([{ path: '', component: SidenavComponent }])
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }

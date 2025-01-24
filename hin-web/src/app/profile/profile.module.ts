import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SidenavComponent } from '../sidenav/sidenav.component';


@NgModule({
  declarations: [
    ProfileComponent, SidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
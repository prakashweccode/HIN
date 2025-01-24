import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { AlertModule } from '../alert/alert.module';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnedriveConnectModule } from '../onedrive-connect/onedrive-connect.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AlertModule,
    LoginRoutingModule,
    CommonModule,
    FormsModule, OnedriveConnectModule
  ]
})
export class LoginModule { }

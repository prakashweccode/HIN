import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { explorerValues } from '../helper/onedriveconfig';
import * as hello from 'hellojs/dist/hello.all.js';
import { OnedrivegraphAuthService } from '../onedriveservice/onedrivegraph-auth.service';

@Component({
  selector: 'app-onedrive-connect',
  templateUrl: './onedrive-connect.component.html',
  styleUrls: ['./onedrive-connect.component.css']
})

export class OnedriveConnectComponent implements OnInit, DoCheck {
  @Input() fromLogin: boolean;
  _explorerValues = explorerValues;
  public connected: boolean = false;
  constructor(private oneDriveAuthService: OnedrivegraphAuthService) { }
  
  ngOnInit() { }

  ngDoCheck() {
    if (this._explorerValues.authentication.status === 'authenticated') {
      this.connected = true;
    }
    else {
      this.connected = false;
    }
  }

  onLogin() {
    this.oneDriveAuthService.login();
  }

  onMicrosoftLogin() {
    this.oneDriveAuthService.microsoftLogin();
  }

  onLogout() {
    this.oneDriveAuthService.logout();
  }
}

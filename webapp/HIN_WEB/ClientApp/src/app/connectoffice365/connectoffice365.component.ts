import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../officeauth/auth.service';
import { GraphService } from '../officeauth/graph.service';

@Component({
  selector: 'app-connectoffice365',
  templateUrl: './connectoffice365.component.html',
  styleUrls: ['./connectoffice365.component.css']
})
export class Connectoffice365Component implements OnInit {
  @Output() statusEmitter = new EventEmitter();
  constructor(private officeService: AuthService, private graphService: GraphService) { }

  ngOnInit() {
    this.statusEmitter.emit(this.officeService.authenticated);
  }

  async signIn(): Promise<void> {
    if (!this.authenticated) {
      await this.officeService.signIn();
      this.statusEmitter.emit(this.authenticated);
    }
    else {
    }
  }
  get authenticated(): boolean {
    return this.officeService.authenticated;
  }
  async signOut(): Promise<void> {
    await this.officeService.signOut();
    this.statusEmitter.emit(this.authenticated);
  }

  async getCalendars(): Promise<void> {
    let calendars = await this.graphService.getCalendars();
  }

}

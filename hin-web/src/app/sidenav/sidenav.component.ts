import { Component, Input, OnInit } from '@angular/core';
type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() isSidebarVisible:boolean=true;
  @Input() profile: ProfileType | undefined;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { UserDetail } from '../login/login';
import { NavbarService } from '../navbar/navbar.service';
import { Router } from '@angular/router';
import { SideMenuStyleService } from '../loader.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SideMenuStyle } from '../loader';
import { MsalService } from '@azure/msal-angular';
import { Users } from '../users/users';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  dropDownToggle: boolean = false;
  dropMarkDownToggle: boolean = false;
  isSideMenu: boolean = true;
  user: UserDetail;
  sideMenu: Subscription;
  sideMenuSubscription: Subscription;
  showSideMenu: boolean = true;
  providerToggle: boolean = false;
  marketingToggle: boolean = false;
  systemToggle: boolean = false;
  showSubMenu: boolean = false;
  mobileMenuToggle: boolean = false;
  constructor(public navBarService: NavbarService, public router: Router, public sideMenuStyleService: SideMenuStyleService, private graphService: MsalService)
  {
    if (navBarService.userInformation) {
      this.user = new UserDetail();
      this.user.User = new Users();
      this.user.Token = navBarService.userInformation.Token;
      this.user.User.Email = navBarService.userInformation.User.Email;
      this.user.User.FirstName = navBarService.userInformation.User.FirstName;
    }
    

  }

  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem("userDetail"));
  }

  ngAfterViewInit() {
    this.sideMenuSubscription = this.sideMenuStyleService.sideMenuState.pipe(delay(0)).subscribe((state: SideMenuStyle) => {
      this.showSideMenu = state.MaxWidth;
    });
  }

  logout() {
    localStorage.clear();
    this.navBarService.clearUser();
    this.router.navigate(['/login']);
    this.graphService.logout();
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  sideMenuToogle() {
    if (this.isSideMenu == true) {
      this.isSideMenu = false;
      this.showSideMenu = false;
      this.sideMenuStyleService.hide();
    }
    else {
      this.isSideMenu = true;
      this.showSideMenu = true;
      this.sideMenuStyleService.show();
    }
  }

  //myFunction() {
  //  var x = document.getElementById("Demo");
  //  if (x.className.indexOf("w3-show") == -1) {
  //    x.className += " w3-show";
  //  }
  //  else {
  //    x.className = x.className.replace(" w3-show", "");
  //  }
  //}


  //gotoService() {
  //  this.dropDownToggle = false;
  //  this.router.navigate(['/listservices']);
  //}

  gotoVendor() {
    this.dropDownToggle = false;
    this.router.navigate(['/listvendor']);
  }
  gotoPartner() {
    this.dropDownToggle = false;
    this.router.navigate(['/listpartner']);
  }
  gotoReferral() {
    this.dropDownToggle = false;
    this.router.navigate(['/listreferral']);
  }
  gotoEvent() {
    this.dropDownToggle = false;
    this.router.navigate(['/listeventshow']);
  }
  gotoNetwork() {
    this.dropDownToggle = false;
    this.router.navigate(['/listnetworking']);
  }
  gotoPartCatalog() {
    this.dropDownToggle = false;
    this.router.navigate(['/listpartcatalog']);
  }
  gotoOffice365Mail() {
    this.dropDownToggle = false;
    this.router.navigate(['/officemailbox']);
  }
  gotoContactGroup() {
    this.dropDownToggle = false;
    this.router.navigate(['/contactgroup']);
  }
  @HostListener("document:click", ["$event"])
  onClick(event) {
    let elementName = event.target.getAttribute("menuname");
    if (!elementName) {
      this.marketingToggle = false;
      this.providerToggle = false;
      this.systemToggle = false;
    }
  }
  gotoUser() {
    this.dropDownToggle = false;
    this.router.navigate(['/manageuser']);
  }
  gotoCompanies() {
    this.dropDownToggle = false;
    this.router.navigate(['/listcompanyregister']);
  }
  gotoCurrencies() {
    this.dropDownToggle = false;
    this.router.navigate(['/listcurrency']);
  }
  manageCustomFields() {
    this.dropDownToggle = false;
    this.router.navigate(['/custom-fields']);
  }
  gotoSettings() {
    this.dropDownToggle = false;
    this.router.navigate(['/settings']);
  }
  gotoSecurityPermission() {
    this.dropDownToggle = false;
    this.router.navigate(['/securitypermissions']);
  }
  gotoCharts() {
    this.dropDownToggle = false;
    this.router.navigate(['/usercharts']);
  }
  gotoDashboardSettings() {
    this.dropDownToggle = false;
    this.router.navigate(['/listDashboardConfig']);
  }
  gotoImportSettings() {
    this.dropDownToggle = false;
    this.router.navigate(['/importsettings']);
  }
  gotoSearch() {
    this.dropDownToggle = false;
    this.router.navigate(['/search']);
  }

  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  mainFunction() {
    document.getElementById("textDropdown").classList.toggle("maintainShow");
  }

}

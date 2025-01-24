import { Component, ViewChild } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar/navbar.service';
import { SideMenuStyleService, ThemeService, GaugeChartService } from '../loader.service';
import { GraphService } from '../officeauth/graph.service';
import { AuthService } from '../officeauth/auth.service';
import { Subscription } from 'rxjs';
import { SideMenuStyle, GaugeChart } from '../loader';
import { delay } from 'rxjs/operators';
import { window } from 'ngx-bootstrap';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  signUpDisabled: boolean = false;
  showGuage: boolean = false;
  sideMenuSubscription: Subscription;
  gaugeChartSubscription: Subscription;
  showSideMenu: boolean = true;
  showGaugeChart: boolean = true;
  isExpanded = false;
  dropDownToggle: boolean = false;
  appTitle: string;
  public userId: number;

  //disableChart: boolean = false;
  //@ViewChild(ChartComponent, { static: false }) public Chart: ChartComponent;

  constructor(public themeService: ThemeService, public gaugeChartService: GaugeChartService, public sideMenuStyleService: SideMenuStyleService, appConfigSvc: AppConfigService, titleService: Title, public router: Router, public navBarService: NavbarService, private graphService: GraphService, private officeService: AuthService) {
    appConfigSvc.getAppConfig().subscribe(data => {
      this.appTitle = (data.settings.find(x => x.key == 'AppTitle').value);
    });
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("userDetail"));
    if (user) {
      this.userId = user.User.UserId;
    }
    var subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false;
    if (subdomain) {
      this.signUpDisabled = true;
    }

  }

  gotoEmail() {
    this.router.navigate(['/email']);
  }

  gotoImportSettings() {
    this.router.navigate(['/importsettings']);
  }

  manageCustomFields() {
    this.dropDownToggle = false;
    this.router.navigate(['/custom-fields']);
  }
  goToSettings() {
    //this.router.navigate(['/custom-fields']);
  }
  gotoManageUser() {
    this.dropDownToggle = false;
    this.router.navigate(['/manageuser']);
  }

  gotoSettings() {
    this.dropDownToggle = false;
    this.router.navigate(['/settings']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    localStorage.clear();
    this.navBarService.clearUser();
    window.location.href = "/login";
    //window.location.reload();
  }

  gotoUser() {
    this.dropDownToggle = false;
    this.router.navigate(['/manageuser']);
  }
  gotoCurrencies() {
    this.dropDownToggle = false;
    this.router.navigate(['/listcurrency']);
  }
  goToVendors() {
    this.dropDownToggle = false;
    this.router.navigate(['/listvendor']);
  }
  gotoEventshows() {
    this.dropDownToggle = false;
    this.router.navigate(['/listeventshow']);
  }
  gotoNetworking() {
    this.dropDownToggle = false;
    this.router.navigate(['/listnetworking']);
  }
  gotoCompanies() {
    this.dropDownToggle = false;
    this.router.navigate(['/listcompanyregister']);
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
  gotoPartCatalog() {
    this.dropDownToggle = false;
    this.router.navigate(['/listpartcatalog']);
  }
  gotoOffice365Mail() {
    this.dropDownToggle = false;
    this.router.navigate(['/officemailbox']);
  }
  async signIn(): Promise<void> {
    if (!this.authenticated)
      await this.officeService.signIn();
    else {
    }
  }
  get authenticated(): boolean {
    return this.officeService.authenticated;
  }
  async signOut(): Promise<void> {
    await this.officeService.signOut();
  }
  async getCalendars(): Promise<void> {
    let calendars = await this.graphService.getCalendars();
  }
  ngAfterViewInit() {
    this.sideMenuSubscription = this.sideMenuStyleService.sideMenuState.pipe(delay(0)).subscribe((state: SideMenuStyle) => {
      this.showSideMenu = state.MaxWidth;
    });
    this.gaugeChartSubscription = this.gaugeChartService.gaugeChartState.pipe(delay(0)).subscribe((state: GaugeChart) => {
      this.showGaugeChart = state.display;
    });
  }
}

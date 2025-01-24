import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserDetail } from './login/login';
import { NavbarService } from './navbar/navbar.service';
import { LoaderService, ModalService, ThemeService, SideMenuStyleService, GaugeChartService } from './loader.service';
import { Subscription } from 'rxjs';
//import { BnNgIdleService } from 'bn-ng-idle';
import { Loader, Modal, Themes, SideMenuStyle } from './loader';
import { delay } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet, ActivatedRoute, ActivationStart } from '@angular/router';
import { DynamicmodalComponent } from './helper/dynamicmodal/dynamicmodal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UsersService } from './users/users.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { OnedrivegraphService } from './onedriveservice/onedrivegraph.service';
import { OnedrivegraphAuthService } from './onedriveservice/onedrivegraph-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(RouterOutlet, { static: true }) outlet: RouterOutlet;
  hrefUrl: SafeResourceUrl;
  title = 'app';
  subscription: Subscription;
  modalsubscription: Subscription;
  themeSubscription: Subscription;
  sideMenuSubscription: Subscription;
  showSideMenu: boolean = true;
  show = false;
  comp: any;
  modalShow=false;
  user: UserDetail;
  @ViewChild(DynamicmodalComponent, { static: true }) private modal: DynamicmodalComponent;
  constructor(private bnIdle: BnNgIdleService, public userService: UsersService, private sanitizer: DomSanitizer, private router: Router, public navbarService: NavbarService, private loaderService: LoaderService, private modalService: ModalService, public themeService: ThemeService, public sideMenuStyleService: SideMenuStyleService, public gaugeChartService: GaugeChartService, private oneDriveGraphService: OnedrivegraphService, private cdRef: ChangeDetectorRef, private oneDriveAuthService: OnedrivegraphAuthService) {
    this.oneDriveAuthService.initAuth(oneDriveGraphService, cdRef);
    this.bnIdle.startWatching(36000).subscribe((res) => {
      if (res) {
        if (this.router.url !== '/login') {
          alert("Your session has expired due to inactivity. Please login again.")
          localStorage.clear();
          window.location.href = "/login";
          //this.router.navigate(['/login']);
        }
      }
    });
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          let path = (<any>event).url;
          var data = JSON.parse(localStorage.getItem("userDetail"));
          if (path == '/home' || path == '/') {
            this.gaugeChartService.hide();
          }
          else {
            this.gaugeChartService.show();
          }
          this.show = true;
          if (this.modalShow) {
            this.modalService.hide();
          }
          if (!data && path.indexOf('/reset') != -1 && path.indexOf('/forgot') != -1) {
           
            this.router.navigate(['/login']);
          }
          break;
        }

        case event instanceof NavigationEnd: {
        }
        case event instanceof ActivationStart: {

        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.show = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    
  }

  ngOnInit() {
    var data = JSON.parse(localStorage.getItem("userDetail"));
    if (data) {
      this.user = data;
      this.getUserThemeById(this.user.User.UserId);
    }
    else {
      this.hrefUrl = this.removeUnsafe("assets/themestyles/blackandgreen.css");
    }
  }

  getUserThemeById(id) {
    if (id) {
      this.userService.getUserById(id).subscribe(data => {
        this.user.User = data;
        if (this.user.User.UserTheme != null) {
          this.hrefUrl = this.removeUnsafe("assets/themestyles/" + this.user.User.UserTheme);
          //window.location.href = "/listleads";
        }
        else {
          this.hrefUrl = this.removeUnsafe("assets/themestyles/blackandgreen.css");
          //window.location.href = "/listleads";
        }
      });
    }
  }

  ngAfterViewInit() {
    this.subscription = this.loaderService.loaderState.pipe(delay(0))
      .subscribe((state: Loader) => {
        this.show = state.show;
      });
    this.subscription = this.modalService.loaderState.pipe(delay(0))
      .subscribe((state: Modal) => {
        this.comp = state.comp;
       
        this.modalShow = state.show;
        
      });

    this.themeSubscription = this.themeService.themeState.pipe(delay(0)).subscribe((state: Themes) => {
      this.hrefUrl = this.removeUnsafe("assets/themestyles/" + state.FileName);
    });

    this.sideMenuSubscription = this.sideMenuStyleService.sideMenuState.pipe(delay(0)).subscribe((state: SideMenuStyle) => {
      this.showSideMenu = state.MaxWidth;
    });
  }


  closeModel() {
    this.modalShow = !this.modalShow;
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  removeUnsafe(URL) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL);
  }

  @HostListener("document:beforeunload", ["$event"])
  clearLocalStorage(event) {
    var data = JSON.parse(localStorage.getItem("userDetail"));
    if (!data) {
      alert("Your session has expired. Please login again.")
      localStorage.clear();
      //this.router.navigate(['/login']);
      window.location.href = "/login";
    }
  }
}



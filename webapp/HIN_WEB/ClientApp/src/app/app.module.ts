import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService } from './app-config.service';
import { NotyHelper } from './helper/NotyHelper';
import { NavMenuModule } from './nav-menu/nav-menu.module';
import { RouterModule } from '@angular/router';
import { NavbarService } from './navbar/navbar.service';
import { LoaderService, ModalService, ThemeService, SideMenuStyleService, GaugeChartService } from './loader.service';
import { PagerService } from './helper/pager.service';
import { ErrorHandler } from './helper/ErrorHandler';
import { Datashared } from './helper/datashared';
import { EditcolumnModule } from './editcolumn/editcolumn.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicmodalComponent } from './helper/dynamicmodal/dynamicmodal.component';
import { AddnewfieldModule } from './addnewfield/addnewfield.module';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { OAuthSettings } from './helper/oauth';
import { BnNgIdleService } from 'bn-ng-idle';
import { NavPermissionCheck } from './helper/directive/NavPermissionCheck';
import { DirectiveHelperModule } from './helper/directive/DirectiveHelperModule';
import { JwtInterceptor } from './helper/AuthInterceptor';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UserQuotaCalcHelper } from './helper/user-quota-calc-helper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SumPipe } from './helper/sum.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OnedrivegraphAuthService } from './onedriveservice/onedrivegraph-auth.service';
import { OnedrivegraphService } from './onedriveservice/onedrivegraph.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  dropSpecialCharacters: true
};

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent, DynamicmodalComponent, SumPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, NgxPaginationModule,
    NgxMaskModule.forRoot(options), NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule, NavMenuModule, RouterModule, EditcolumnModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }), BrowserAnimationsModule, AddnewfieldModule, MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId,
        redirectUri: OAuthSettings.redirectUri,
        authority: OAuthSettings.authority,
        navigateToLoginRequestUrl: true,
        postLogoutRedirectUri: '/',
        validateAuthority:true
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE // set to true for IE 11
      }
    },
      {
        popUp: !isIE,
        consentScopes: ["user.read", "openid", "profile", 'api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user'],
        unprotectedResources: ["https://www.microsoft.com/en-us/"],
        extraQueryParameters: {},
        protectedResourceMap
      }
    ),
    DirectiveHelperModule
  ],
  providers: [
    NavbarService, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ModalService, ThemeService, Title, Datashared, SideMenuStyleService, GaugeChartService, OnedrivegraphAuthService, OnedrivegraphService,
    NotyHelper, PagerService, BnNgIdleService, ErrorHandler, UserQuotaCalcHelper,
    AppConfigService, {
      provide: APP_INITIALIZER,
      useFactory: (appConfigSvc: AppConfigService, titleService: Title) => {
        return () => {
          return appConfigSvc.getAppConfig().subscribe((response) => {
            titleService.setTitle(response.settings.find(x => x.key == 'AppTitle').value);
          });
        }
      },
      multi: true,
      deps: [AppConfigService, Title]
    }, MsalService, NavPermissionCheck
  ],
  bootstrap: [AppComponent],
  entryComponents: [DynamicmodalComponent]
})
export class AppModule { }

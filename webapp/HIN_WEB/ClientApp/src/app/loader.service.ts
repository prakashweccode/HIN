import { Injectable } from '@angular/core';
import { Loader, Modal, Themes, SideMenuStyle, GaugeChart } from './loader'
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<Loader>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    this.loaderSubject.next(<Loader>{ show: true });
  }
  hide() {
    this.loaderSubject.next(<Loader>{ show: false });
  }
}

@Injectable()
export class ModalService {
  private loaderSubject = new Subject<Modal>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show(comp) {
    this.loaderSubject.next(<Modal>{ show: true, comp: comp });
  }
  hide() {
    this.loaderSubject.next(<Modal>{ show: false, comp:null });
  }
}


@Injectable()
export class ThemeService {
  private themeSubject = new Subject<Themes>();
  themeState = this.themeSubject.asObservable();
  constructor() { }
  selectTheme(comp) {
    this.themeSubject.next(<Themes>{ Id: null, Name: "", FileName:comp });
  }
}

@Injectable()
export class SideMenuStyleService {
  private sideMenuSubject = new Subject<SideMenuStyle>();
  sideMenuState = this.sideMenuSubject.asObservable();
  show() {
    this.sideMenuSubject.next(<SideMenuStyle>{ MaxWidth: true });
  }
  hide() {
    this.sideMenuSubject.next(<SideMenuStyle>{ MaxWidth: false });
  }
}
@Injectable()
export class GaugeChartService {
  private gaugeChartSubject = new Subject<GaugeChart>();
  gaugeChartState = this.gaugeChartSubject.asObservable();
  show() {
    this.gaugeChartSubject.next(<GaugeChart>{ display: true });
  }
  hide() {
    this.gaugeChartSubject.next(<GaugeChart>{ display: false });
  }
}

import { Injectable } from '@angular/core';
import { Loader } from './loader'
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

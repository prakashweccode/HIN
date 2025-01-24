import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Loader } from './loader';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'k9crm-company-app';
  public show: boolean | undefined;
  public subscription: Subscription | undefined;
  constructor(private loaderService: LoaderService) { }
  ngAfterViewInit() {
    this.subscription = this.loaderService.loaderState.pipe(delay(0))
      .subscribe((state: Loader) => {
        this.show = state.show;
      });
  }
}

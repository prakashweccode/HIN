import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoaderService } from "../loader.service";
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const idToken = JSON.parse(localStorage.getItem("userDetail"));
    if (req.url.indexOf("https://api.ipify.org/?format=json") != -1) {
      return next.handle(req);
    }
    else if (req.url.indexOf("graph.microsoft.com") != -1) {
      return next.handle(req).pipe(
        tap(),
        finalize(() => { this.loaderService.hide(); })
      );
    }
    else {
      if (idToken) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization",
            "Bearer " + idToken.Token)
        });
        return next.handle(cloned).pipe(
          tap(),
          // Log when response observable either completes or errors
          finalize(() => {
            //const elapsed = Date.now() - started;
            // const msg = `${req.method} "${req.urlWithParams}"
            //    ${ok} in ${elapsed} ms.`;
            // this.messenger.add(msg);
            //console.log("elapsed: " + elapsed);
            this.loaderService.hide();
          })
        );
      }
      else {
        return next.handle(req).pipe(
          tap(
            // Succeeds when there is a response; ignore other events
            //event => ok = event instanceof HttpResponse ? 'succeeded' : '',
            // Operation failed; error is an HttpErrorResponse
            //error => ok = 'failed'
          ),
          // Log when response observable either completes or errors
          finalize(() => {
            //const elapsed = Date.now() - started;
            // const msg = `${req.method} "${req.urlWithParams}"
            //    ${ok} in ${elapsed} ms.`;
            // this.messenger.add(msg);
            //console.log("elapsed: " + elapsed);
            this.loaderService.hide();
          })
        );
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Config } from './helper/Config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
    readonly appConfiguration$: Observable<Config>;
    private appConfiguration: BehaviorSubject<Config>;

    constructor(private http: HttpClient) {
        this.appConfiguration = new BehaviorSubject({} as Config);
        this.appConfiguration$ = this.appConfiguration.asObservable();
    }
    public getAppConfig(): Observable<Config> {
        return Observable.create((observer) => {
            this.http.get<Config>('/assets/app-config.json').subscribe((response) => {
                this.appConfiguration.next(response);
                return observer.next(response);
            });
        });
    }  
}

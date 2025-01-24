/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TenantUserDataModel } from '../models/tenant-user-data-model';

@Injectable({
  providedIn: 'root',
})
export class TenantUserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTenantUserGetTenantUserGet
   */
  static readonly ApiTenantUserGetTenantUserGetPath = '/api/TenantUser/GetTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserGetTenantUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserGetTenantUserGet$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<TenantUserDataModel>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserGetTenantUserGetPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TenantUserDataModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserGetTenantUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserGetTenantUserGet$Plain(params?: {
    id?: number;
  }): Observable<TenantUserDataModel> {

    return this.apiTenantUserGetTenantUserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TenantUserDataModel>) => r.body as TenantUserDataModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserGetTenantUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserGetTenantUserGet$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<TenantUserDataModel>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserGetTenantUserGetPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TenantUserDataModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserGetTenantUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserGetTenantUserGet$Json(params?: {
    id?: number;
  }): Observable<TenantUserDataModel> {

    return this.apiTenantUserGetTenantUserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TenantUserDataModel>) => r.body as TenantUserDataModel)
    );
  }

  /**
   * Path part for operation apiTenantUserFindAllTenantUserGet
   */
  static readonly ApiTenantUserFindAllTenantUserGetPath = '/api/TenantUser/FindAllTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserFindAllTenantUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserFindAllTenantUserGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<TenantUserDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserFindAllTenantUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TenantUserDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserFindAllTenantUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserFindAllTenantUserGet$Plain(params?: {
  }): Observable<Array<TenantUserDataModel>> {

    return this.apiTenantUserFindAllTenantUserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TenantUserDataModel>>) => r.body as Array<TenantUserDataModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserFindAllTenantUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserFindAllTenantUserGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<TenantUserDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserFindAllTenantUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TenantUserDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserFindAllTenantUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserFindAllTenantUserGet$Json(params?: {
  }): Observable<Array<TenantUserDataModel>> {

    return this.apiTenantUserFindAllTenantUserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TenantUserDataModel>>) => r.body as Array<TenantUserDataModel>)
    );
  }

  /**
   * Path part for operation apiTenantUserCreateTenantUserPost
   */
  static readonly ApiTenantUserCreateTenantUserPostPath = '/api/TenantUser/CreateTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserCreateTenantUserPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserCreateTenantUserPost$Plain$Response(params?: {
    body?: TenantUserDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserCreateTenantUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserCreateTenantUserPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserCreateTenantUserPost$Plain(params?: {
    body?: TenantUserDataModel
  }): Observable<number> {

    return this.apiTenantUserCreateTenantUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserCreateTenantUserPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserCreateTenantUserPost$Json$Response(params?: {
    body?: TenantUserDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserCreateTenantUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserCreateTenantUserPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserCreateTenantUserPost$Json(params?: {
    body?: TenantUserDataModel
  }): Observable<number> {

    return this.apiTenantUserCreateTenantUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiTenantUserUpdateTenantUserPost
   */
  static readonly ApiTenantUserUpdateTenantUserPostPath = '/api/TenantUser/UpdateTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserUpdateTenantUserPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserUpdateTenantUserPost$Plain$Response(params?: {
    body?: TenantUserDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserUpdateTenantUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserUpdateTenantUserPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserUpdateTenantUserPost$Plain(params?: {
    body?: TenantUserDataModel
  }): Observable<number> {

    return this.apiTenantUserUpdateTenantUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserUpdateTenantUserPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserUpdateTenantUserPost$Json$Response(params?: {
    body?: TenantUserDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserUpdateTenantUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserUpdateTenantUserPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTenantUserUpdateTenantUserPost$Json(params?: {
    body?: TenantUserDataModel
  }): Observable<number> {

    return this.apiTenantUserUpdateTenantUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiTenantUserDeleteTenantUserDelete
   */
  static readonly ApiTenantUserDeleteTenantUserDeletePath = '/api/TenantUser/DeleteTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserDeleteTenantUserDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserDeleteTenantUserDelete$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserDeleteTenantUserDeletePath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserDeleteTenantUserDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserDeleteTenantUserDelete$Plain(params?: {
    id?: number;
  }): Observable<number> {

    return this.apiTenantUserDeleteTenantUserDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserDeleteTenantUserDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserDeleteTenantUserDelete$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserDeleteTenantUserDeletePath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserDeleteTenantUserDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserDeleteTenantUserDelete$Json(params?: {
    id?: number;
  }): Observable<number> {

    return this.apiTenantUserDeleteTenantUserDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiTenantUserSyncTenantUserGet
   */
  static readonly ApiTenantUserSyncTenantUserGetPath = '/api/TenantUser/SyncTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserSyncTenantUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserSyncTenantUserGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserSyncTenantUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserSyncTenantUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserSyncTenantUserGet$Plain(params?: {
  }): Observable<number> {

    return this.apiTenantUserSyncTenantUserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserSyncTenantUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserSyncTenantUserGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserSyncTenantUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserSyncTenantUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserSyncTenantUserGet$Json(params?: {
  }): Observable<number> {

    return this.apiTenantUserSyncTenantUserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiTenantUserTestCallGet
   */
  static readonly ApiTenantUserTestCallGetPath = '/api/TenantUser/TestCall';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserTestCallGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserTestCallGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserTestCallGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserTestCallGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserTestCallGet$Plain(params?: {
  }): Observable<number> {

    return this.apiTenantUserTestCallGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTenantUserTestCallGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserTestCallGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TenantUserService.ApiTenantUserTestCallGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTenantUserTestCallGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTenantUserTestCallGet$Json(params?: {
  }): Observable<number> {

    return this.apiTenantUserTestCallGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}

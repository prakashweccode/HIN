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

import { CompanyUserDataModel } from '../models/company-user-data-model';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiCompanyUserGetCompanyUserGet
   */
  static readonly ApiCompanyUserGetCompanyUserGetPath = '/api/CompanyUser/GetCompanyUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserGetCompanyUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserGetCompanyUserGet$Plain$Response(params?: {
    userId?: number;
  }): Observable<StrictHttpResponse<CompanyUserDataModel>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserGetCompanyUserGetPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyUserDataModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyUserGetCompanyUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserGetCompanyUserGet$Plain(params?: {
    userId?: number;
  }): Observable<CompanyUserDataModel> {

    return this.apiCompanyUserGetCompanyUserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyUserDataModel>) => r.body as CompanyUserDataModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserGetCompanyUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserGetCompanyUserGet$Json$Response(params?: {
    userId?: number;
  }): Observable<StrictHttpResponse<CompanyUserDataModel>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserGetCompanyUserGetPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyUserDataModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyUserGetCompanyUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserGetCompanyUserGet$Json(params?: {
    userId?: number;
  }): Observable<CompanyUserDataModel> {

    return this.apiCompanyUserGetCompanyUserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyUserDataModel>) => r.body as CompanyUserDataModel)
    );
  }

  /**
   * Path part for operation apiCompanyUserFindAllCompanyUserGet
   */
  static readonly ApiCompanyUserFindAllCompanyUserGetPath = '/api/CompanyUser/FindAllCompanyUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserFindAllCompanyUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserFindAllCompanyUserGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CompanyUserDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserFindAllCompanyUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompanyUserDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyUserFindAllCompanyUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserFindAllCompanyUserGet$Plain(params?: {
  }): Observable<Array<CompanyUserDataModel>> {

    return this.apiCompanyUserFindAllCompanyUserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanyUserDataModel>>) => r.body as Array<CompanyUserDataModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserFindAllCompanyUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserFindAllCompanyUserGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CompanyUserDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserFindAllCompanyUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompanyUserDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyUserFindAllCompanyUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserFindAllCompanyUserGet$Json(params?: {
  }): Observable<Array<CompanyUserDataModel>> {

    return this.apiCompanyUserFindAllCompanyUserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanyUserDataModel>>) => r.body as Array<CompanyUserDataModel>)
    );
  }

  /**
   * Path part for operation apiCompanyUserCreateCompanyUserPost
   */
  static readonly ApiCompanyUserCreateCompanyUserPostPath = '/api/CompanyUser/CreateCompanyUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserCreateCompanyUserPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserCreateCompanyUserPost$Plain$Response(params?: {
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserCreateCompanyUserPostPath, 'post');
    if (params) {
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
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
   * To access the full response (for headers, for example), `apiCompanyUserCreateCompanyUserPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserCreateCompanyUserPost$Plain(params?: {
    userName?: string;
    password?: string;
  }): Observable<number> {

    return this.apiCompanyUserCreateCompanyUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserCreateCompanyUserPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserCreateCompanyUserPost$Json$Response(params?: {
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserCreateCompanyUserPostPath, 'post');
    if (params) {
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
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
   * To access the full response (for headers, for example), `apiCompanyUserCreateCompanyUserPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserCreateCompanyUserPost$Json(params?: {
    userName?: string;
    password?: string;
  }): Observable<number> {

    return this.apiCompanyUserCreateCompanyUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiCompanyUserValidateUserPost
   */
  static readonly ApiCompanyUserValidateUserPostPath = '/api/CompanyUser/ValidateUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserValidateUserPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserValidateUserPost$Plain$Response(params?: {
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<Array<CompanyUserDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserValidateUserPostPath, 'post');
    if (params) {
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompanyUserDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyUserValidateUserPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserValidateUserPost$Plain(params?: {
    userName?: string;
    password?: string;
  }): Observable<Array<CompanyUserDataModel>> {

    return this.apiCompanyUserValidateUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanyUserDataModel>>) => r.body as Array<CompanyUserDataModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserValidateUserPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserValidateUserPost$Json$Response(params?: {
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<Array<CompanyUserDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserValidateUserPostPath, 'post');
    if (params) {
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompanyUserDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyUserValidateUserPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserValidateUserPost$Json(params?: {
    userName?: string;
    password?: string;
  }): Observable<Array<CompanyUserDataModel>> {

    return this.apiCompanyUserValidateUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanyUserDataModel>>) => r.body as Array<CompanyUserDataModel>)
    );
  }

  /**
   * Path part for operation apiCompanyUserUpdateCompanyUserPost
   */
  static readonly ApiCompanyUserUpdateCompanyUserPostPath = '/api/CompanyUser/UpdateCompanyUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserUpdateCompanyUserPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserUpdateCompanyUserPost$Plain$Response(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserUpdateCompanyUserPostPath, 'post');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
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
   * To access the full response (for headers, for example), `apiCompanyUserUpdateCompanyUserPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserUpdateCompanyUserPost$Plain(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<number> {

    return this.apiCompanyUserUpdateCompanyUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserUpdateCompanyUserPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserUpdateCompanyUserPost$Json$Response(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserUpdateCompanyUserPostPath, 'post');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
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
   * To access the full response (for headers, for example), `apiCompanyUserUpdateCompanyUserPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserUpdateCompanyUserPost$Json(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<number> {

    return this.apiCompanyUserUpdateCompanyUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiCompanyUserDeleteCompanyUserDelete
   */
  static readonly ApiCompanyUserDeleteCompanyUserDeletePath = '/api/CompanyUser/DeleteCompanyUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserDeleteCompanyUserDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserDeleteCompanyUserDelete$Plain$Response(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserDeleteCompanyUserDeletePath, 'delete');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
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
   * To access the full response (for headers, for example), `apiCompanyUserDeleteCompanyUserDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserDeleteCompanyUserDelete$Plain(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<number> {

    return this.apiCompanyUserDeleteCompanyUserDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUserDeleteCompanyUserDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserDeleteCompanyUserDelete$Json$Response(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserService.ApiCompanyUserDeleteCompanyUserDeletePath, 'delete');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('userName', params.userName, {});
      rb.query('password', params.password, {});
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
   * To access the full response (for headers, for example), `apiCompanyUserDeleteCompanyUserDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyUserDeleteCompanyUserDelete$Json(params?: {
    userId?: number;
    userName?: string;
    password?: string;
  }): Observable<number> {

    return this.apiCompanyUserDeleteCompanyUserDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}

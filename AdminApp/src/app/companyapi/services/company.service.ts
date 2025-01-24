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

import { CompanyRegister } from '../models/company-register';
import { CompanyRegisterDataModel } from '../models/company-register-data-model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiCompanyGetCompanyRegisterGet
   */
  static readonly ApiCompanyGetCompanyRegisterGetPath = '/api/Company/GetCompanyRegister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyGetCompanyRegisterGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyGetCompanyRegisterGet$Plain$Response(params?: {
    registerId?: number;
  }): Observable<StrictHttpResponse<CompanyRegisterDataModel>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyGetCompanyRegisterGetPath, 'get');
    if (params) {
      rb.query('registerId', params.registerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyRegisterDataModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyGetCompanyRegisterGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyGetCompanyRegisterGet$Plain(params?: {
    registerId?: number;
  }): Observable<CompanyRegisterDataModel> {

    return this.apiCompanyGetCompanyRegisterGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyRegisterDataModel>) => r.body as CompanyRegisterDataModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyGetCompanyRegisterGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyGetCompanyRegisterGet$Json$Response(params?: {
    registerId?: number;
  }): Observable<StrictHttpResponse<CompanyRegisterDataModel>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyGetCompanyRegisterGetPath, 'get');
    if (params) {
      rb.query('registerId', params.registerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyRegisterDataModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyGetCompanyRegisterGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyGetCompanyRegisterGet$Json(params?: {
    registerId?: number;
  }): Observable<CompanyRegisterDataModel> {

    return this.apiCompanyGetCompanyRegisterGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyRegisterDataModel>) => r.body as CompanyRegisterDataModel)
    );
  }

  /**
   * Path part for operation apiCompanyFindAllCompanyRegisterGet
   */
  static readonly ApiCompanyFindAllCompanyRegisterGetPath = '/api/Company/FindAllCompanyRegister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyFindAllCompanyRegisterGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyFindAllCompanyRegisterGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CompanyRegisterDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyFindAllCompanyRegisterGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompanyRegisterDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyFindAllCompanyRegisterGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyFindAllCompanyRegisterGet$Plain(params?: {
  }): Observable<Array<CompanyRegisterDataModel>> {

    return this.apiCompanyFindAllCompanyRegisterGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanyRegisterDataModel>>) => r.body as Array<CompanyRegisterDataModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyFindAllCompanyRegisterGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyFindAllCompanyRegisterGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CompanyRegisterDataModel>>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyFindAllCompanyRegisterGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CompanyRegisterDataModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCompanyFindAllCompanyRegisterGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyFindAllCompanyRegisterGet$Json(params?: {
  }): Observable<Array<CompanyRegisterDataModel>> {

    return this.apiCompanyFindAllCompanyRegisterGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CompanyRegisterDataModel>>) => r.body as Array<CompanyRegisterDataModel>)
    );
  }

  /**
   * Path part for operation apiCompanyCreateCompanyRegisterPost
   */
  static readonly ApiCompanyCreateCompanyRegisterPostPath = '/api/Company/CreateCompanyRegister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyCreateCompanyRegisterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateCompanyRegisterPost$Plain$Response(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyCreateCompanyRegisterPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCompanyCreateCompanyRegisterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateCompanyRegisterPost$Plain(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<number> {

    return this.apiCompanyCreateCompanyRegisterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyCreateCompanyRegisterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateCompanyRegisterPost$Json$Response(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyCreateCompanyRegisterPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCompanyCreateCompanyRegisterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateCompanyRegisterPost$Json(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<number> {

    return this.apiCompanyCreateCompanyRegisterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiCompanyUpdateCompanyRegisterPost
   */
  static readonly ApiCompanyUpdateCompanyRegisterPostPath = '/api/Company/UpdateCompanyRegister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUpdateCompanyRegisterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyUpdateCompanyRegisterPost$Plain$Response(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyUpdateCompanyRegisterPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCompanyUpdateCompanyRegisterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyUpdateCompanyRegisterPost$Plain(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<number> {

    return this.apiCompanyUpdateCompanyRegisterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyUpdateCompanyRegisterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyUpdateCompanyRegisterPost$Json$Response(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyUpdateCompanyRegisterPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCompanyUpdateCompanyRegisterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyUpdateCompanyRegisterPost$Json(params?: {
    body?: CompanyRegisterDataModel
  }): Observable<number> {

    return this.apiCompanyUpdateCompanyRegisterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiCompanyDeleteCompanyRegisterDelete
   */
  static readonly ApiCompanyDeleteCompanyRegisterDeletePath = '/api/Company/DeleteCompanyRegister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyDeleteCompanyRegisterDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyDeleteCompanyRegisterDelete$Plain$Response(params?: {
    registerId?: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyDeleteCompanyRegisterDeletePath, 'delete');
    if (params) {
      rb.query('registerId', params.registerId, {});
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
   * To access the full response (for headers, for example), `apiCompanyDeleteCompanyRegisterDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyDeleteCompanyRegisterDelete$Plain(params?: {
    registerId?: number;
  }): Observable<number> {

    return this.apiCompanyDeleteCompanyRegisterDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyDeleteCompanyRegisterDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyDeleteCompanyRegisterDelete$Json$Response(params?: {
    registerId?: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyDeleteCompanyRegisterDeletePath, 'delete');
    if (params) {
      rb.query('registerId', params.registerId, {});
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
   * To access the full response (for headers, for example), `apiCompanyDeleteCompanyRegisterDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCompanyDeleteCompanyRegisterDelete$Json(params?: {
    registerId?: number;
  }): Observable<number> {

    return this.apiCompanyDeleteCompanyRegisterDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiCompanyCreateNewCompanyPost
   */
  static readonly ApiCompanyCreateNewCompanyPostPath = '/api/Company/CreateNewCompany';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyCreateNewCompanyPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateNewCompanyPost$Plain$Response(params?: {
    body?: CompanyRegister
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyCreateNewCompanyPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCompanyCreateNewCompanyPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateNewCompanyPost$Plain(params?: {
    body?: CompanyRegister
  }): Observable<number> {

    return this.apiCompanyCreateNewCompanyPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCompanyCreateNewCompanyPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateNewCompanyPost$Json$Response(params?: {
    body?: CompanyRegister
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyService.ApiCompanyCreateNewCompanyPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCompanyCreateNewCompanyPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCompanyCreateNewCompanyPost$Json(params?: {
    body?: CompanyRegister
  }): Observable<number> {

    return this.apiCompanyCreateNewCompanyPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}

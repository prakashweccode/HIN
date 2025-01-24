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

import { CompanyDto } from '../models/company-dto';
import { DashboardStatsDto } from '../models/dashboard-stats-dto';
import { TenantUserDto } from '../models/tenant-user-dto';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTransactionGetCompanyDetailsByIdGet
   */
  static readonly ApiTransactionGetCompanyDetailsByIdGetPath = '/api/Transaction/GetCompanyDetailsById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionGetCompanyDetailsByIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetCompanyDetailsByIdGet$Plain$Response(params?: {
    companyId?: number;
  }): Observable<StrictHttpResponse<CompanyDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionGetCompanyDetailsByIdGetPath, 'get');
    if (params) {
      rb.query('companyId', params.companyId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTransactionGetCompanyDetailsByIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetCompanyDetailsByIdGet$Plain(params?: {
    companyId?: number;
  }): Observable<CompanyDto> {

    return this.apiTransactionGetCompanyDetailsByIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyDto>) => r.body as CompanyDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionGetCompanyDetailsByIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetCompanyDetailsByIdGet$Json$Response(params?: {
    companyId?: number;
  }): Observable<StrictHttpResponse<CompanyDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionGetCompanyDetailsByIdGetPath, 'get');
    if (params) {
      rb.query('companyId', params.companyId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTransactionGetCompanyDetailsByIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetCompanyDetailsByIdGet$Json(params?: {
    companyId?: number;
  }): Observable<CompanyDto> {

    return this.apiTransactionGetCompanyDetailsByIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyDto>) => r.body as CompanyDto)
    );
  }

  /**
   * Path part for operation apiTransactionGetTenantUserByIdGet
   */
  static readonly ApiTransactionGetTenantUserByIdGetPath = '/api/Transaction/GetTenantUserById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionGetTenantUserByIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetTenantUserByIdGet$Plain$Response(params?: {
    userId?: number;
    tenantName?: string;
  }): Observable<StrictHttpResponse<TenantUserDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionGetTenantUserByIdGetPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('tenantName', params.tenantName, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TenantUserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTransactionGetTenantUserByIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetTenantUserByIdGet$Plain(params?: {
    userId?: number;
    tenantName?: string;
  }): Observable<TenantUserDto> {

    return this.apiTransactionGetTenantUserByIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TenantUserDto>) => r.body as TenantUserDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionGetTenantUserByIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetTenantUserByIdGet$Json$Response(params?: {
    userId?: number;
    tenantName?: string;
  }): Observable<StrictHttpResponse<TenantUserDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionGetTenantUserByIdGetPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('tenantName', params.tenantName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TenantUserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTransactionGetTenantUserByIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetTenantUserByIdGet$Json(params?: {
    userId?: number;
    tenantName?: string;
  }): Observable<TenantUserDto> {

    return this.apiTransactionGetTenantUserByIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TenantUserDto>) => r.body as TenantUserDto)
    );
  }

  /**
   * Path part for operation apiTransactionUpdateTenantUserPost
   */
  static readonly ApiTransactionUpdateTenantUserPostPath = '/api/Transaction/UpdateTenantUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionUpdateTenantUserPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateTenantUserPost$Plain$Response(params?: {
    body?: TenantUserDto
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionUpdateTenantUserPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiTransactionUpdateTenantUserPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateTenantUserPost$Plain(params?: {
    body?: TenantUserDto
  }): Observable<number> {

    return this.apiTransactionUpdateTenantUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionUpdateTenantUserPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateTenantUserPost$Json$Response(params?: {
    body?: TenantUserDto
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionUpdateTenantUserPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiTransactionUpdateTenantUserPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateTenantUserPost$Json(params?: {
    body?: TenantUserDto
  }): Observable<number> {

    return this.apiTransactionUpdateTenantUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiTransactionUpdateCompanyRegisterPost
   */
  static readonly ApiTransactionUpdateCompanyRegisterPostPath = '/api/Transaction/UpdateCompanyRegister';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionUpdateCompanyRegisterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateCompanyRegisterPost$Plain$Response(params?: {
    body?: CompanyDto
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionUpdateCompanyRegisterPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiTransactionUpdateCompanyRegisterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateCompanyRegisterPost$Plain(params?: {
    body?: CompanyDto
  }): Observable<number> {

    return this.apiTransactionUpdateCompanyRegisterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionUpdateCompanyRegisterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateCompanyRegisterPost$Json$Response(params?: {
    body?: CompanyDto
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionUpdateCompanyRegisterPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiTransactionUpdateCompanyRegisterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTransactionUpdateCompanyRegisterPost$Json(params?: {
    body?: CompanyDto
  }): Observable<number> {

    return this.apiTransactionUpdateCompanyRegisterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation apiTransactionGetDasboardStatsGet
   */
  static readonly ApiTransactionGetDasboardStatsGetPath = '/api/Transaction/GetDasboardStats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionGetDasboardStatsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetDasboardStatsGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<DashboardStatsDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionGetDasboardStatsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DashboardStatsDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTransactionGetDasboardStatsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetDasboardStatsGet$Plain(params?: {
  }): Observable<DashboardStatsDto> {

    return this.apiTransactionGetDasboardStatsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<DashboardStatsDto>) => r.body as DashboardStatsDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTransactionGetDasboardStatsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetDasboardStatsGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<DashboardStatsDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.ApiTransactionGetDasboardStatsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DashboardStatsDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTransactionGetDasboardStatsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTransactionGetDasboardStatsGet$Json(params?: {
  }): Observable<DashboardStatsDto> {

    return this.apiTransactionGetDasboardStatsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<DashboardStatsDto>) => r.body as DashboardStatsDto)
    );
  }

}

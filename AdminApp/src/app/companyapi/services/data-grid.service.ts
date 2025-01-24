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

import { CompanyRegisterListDtoListInt32NullableTuple } from '../models/company-register-list-dto-list-int-32-nullable-tuple';
import { CompanyUserListDtoListInt32NullableTuple } from '../models/company-user-list-dto-list-int-32-nullable-tuple';
import { FilterDropDownListRequestDto } from '../models/filter-drop-down-list-request-dto';
import { FilterDropDownListResponseDto } from '../models/filter-drop-down-list-response-dto';
import { GridFilterDataModel } from '../models/grid-filter-data-model';
import { TenantUserListDtoListInt32NullableTuple } from '../models/tenant-user-list-dto-list-int-32-nullable-tuple';

@Injectable({
  providedIn: 'root',
})
export class DataGridService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiDataGridGetTenantUserListPost
   */
  static readonly ApiDataGridGetTenantUserListPostPath = '/api/DataGrid/GetTenantUserList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetTenantUserListPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetTenantUserListPost$Plain$Response(params?: {
    body?: GridFilterDataModel
  }): Observable<StrictHttpResponse<TenantUserListDtoListInt32NullableTuple>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetTenantUserListPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TenantUserListDtoListInt32NullableTuple>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetTenantUserListPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetTenantUserListPost$Plain(params?: {
    body?: GridFilterDataModel
  }): Observable<TenantUserListDtoListInt32NullableTuple> {

    return this.apiDataGridGetTenantUserListPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TenantUserListDtoListInt32NullableTuple>) => r.body as TenantUserListDtoListInt32NullableTuple)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetTenantUserListPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetTenantUserListPost$Json$Response(params?: {
    body?: GridFilterDataModel
  }): Observable<StrictHttpResponse<TenantUserListDtoListInt32NullableTuple>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetTenantUserListPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TenantUserListDtoListInt32NullableTuple>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetTenantUserListPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetTenantUserListPost$Json(params?: {
    body?: GridFilterDataModel
  }): Observable<TenantUserListDtoListInt32NullableTuple> {

    return this.apiDataGridGetTenantUserListPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TenantUserListDtoListInt32NullableTuple>) => r.body as TenantUserListDtoListInt32NullableTuple)
    );
  }

  /**
   * Path part for operation apiDataGridGetCompanyUserPost
   */
  static readonly ApiDataGridGetCompanyUserPostPath = '/api/DataGrid/GetCompanyUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetCompanyUserPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyUserPost$Plain$Response(params?: {
    body?: GridFilterDataModel
  }): Observable<StrictHttpResponse<CompanyUserListDtoListInt32NullableTuple>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetCompanyUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyUserListDtoListInt32NullableTuple>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetCompanyUserPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyUserPost$Plain(params?: {
    body?: GridFilterDataModel
  }): Observable<CompanyUserListDtoListInt32NullableTuple> {

    return this.apiDataGridGetCompanyUserPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyUserListDtoListInt32NullableTuple>) => r.body as CompanyUserListDtoListInt32NullableTuple)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetCompanyUserPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyUserPost$Json$Response(params?: {
    body?: GridFilterDataModel
  }): Observable<StrictHttpResponse<CompanyUserListDtoListInt32NullableTuple>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetCompanyUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyUserListDtoListInt32NullableTuple>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetCompanyUserPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyUserPost$Json(params?: {
    body?: GridFilterDataModel
  }): Observable<CompanyUserListDtoListInt32NullableTuple> {

    return this.apiDataGridGetCompanyUserPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyUserListDtoListInt32NullableTuple>) => r.body as CompanyUserListDtoListInt32NullableTuple)
    );
  }

  /**
   * Path part for operation apiDataGridGetCompanyRegisterListPost
   */
  static readonly ApiDataGridGetCompanyRegisterListPostPath = '/api/DataGrid/GetCompanyRegisterList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetCompanyRegisterListPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyRegisterListPost$Plain$Response(params?: {
    body?: GridFilterDataModel
  }): Observable<StrictHttpResponse<CompanyRegisterListDtoListInt32NullableTuple>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetCompanyRegisterListPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyRegisterListDtoListInt32NullableTuple>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetCompanyRegisterListPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyRegisterListPost$Plain(params?: {
    body?: GridFilterDataModel
  }): Observable<CompanyRegisterListDtoListInt32NullableTuple> {

    return this.apiDataGridGetCompanyRegisterListPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyRegisterListDtoListInt32NullableTuple>) => r.body as CompanyRegisterListDtoListInt32NullableTuple)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetCompanyRegisterListPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyRegisterListPost$Json$Response(params?: {
    body?: GridFilterDataModel
  }): Observable<StrictHttpResponse<CompanyRegisterListDtoListInt32NullableTuple>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetCompanyRegisterListPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompanyRegisterListDtoListInt32NullableTuple>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetCompanyRegisterListPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetCompanyRegisterListPost$Json(params?: {
    body?: GridFilterDataModel
  }): Observable<CompanyRegisterListDtoListInt32NullableTuple> {

    return this.apiDataGridGetCompanyRegisterListPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CompanyRegisterListDtoListInt32NullableTuple>) => r.body as CompanyRegisterListDtoListInt32NullableTuple)
    );
  }

  /**
   * Path part for operation apiDataGridGetFilterDropDownResponsePost
   */
  static readonly ApiDataGridGetFilterDropDownResponsePostPath = '/api/DataGrid/GetFilterDropDownResponse';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetFilterDropDownResponsePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetFilterDropDownResponsePost$Plain$Response(params?: {
    body?: FilterDropDownListRequestDto
  }): Observable<StrictHttpResponse<Array<FilterDropDownListResponseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetFilterDropDownResponsePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FilterDropDownListResponseDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetFilterDropDownResponsePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetFilterDropDownResponsePost$Plain(params?: {
    body?: FilterDropDownListRequestDto
  }): Observable<Array<FilterDropDownListResponseDto>> {

    return this.apiDataGridGetFilterDropDownResponsePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FilterDropDownListResponseDto>>) => r.body as Array<FilterDropDownListResponseDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiDataGridGetFilterDropDownResponsePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetFilterDropDownResponsePost$Json$Response(params?: {
    body?: FilterDropDownListRequestDto
  }): Observable<StrictHttpResponse<Array<FilterDropDownListResponseDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DataGridService.ApiDataGridGetFilterDropDownResponsePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FilterDropDownListResponseDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiDataGridGetFilterDropDownResponsePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiDataGridGetFilterDropDownResponsePost$Json(params?: {
    body?: FilterDropDownListRequestDto
  }): Observable<Array<FilterDropDownListResponseDto>> {

    return this.apiDataGridGetFilterDropDownResponsePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FilterDropDownListResponseDto>>) => r.body as Array<FilterDropDownListResponseDto>)
    );
  }

}

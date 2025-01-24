import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {

  constructor(public http: HttpClient) { }
  getData(filter, top, skip, apiUrl, staticFilter, orderBy, expand) {
    let arr_param = [{ key: '$top', value: top }, { key: '$count', value: 'true' }, { key: '$skip', value: skip }];
    if (expand && expand != '') {
      arr_param.push({ key: '$expand', value: expand });
    }
    //var sf_params = new HttpParams().set('$top', top).set('$count', 'true').set('$skip', skip);
    if (staticFilter) {
      if (filter) {
        filter = "(" + filter + ") and (" + staticFilter + ")";

      }
      else {
        filter = staticFilter;
      }
      //sf_params.append('$filter', filter);
      arr_param.push({ key: '$filter', value: filter });
    }
    else {
      if (filter) {
        //sf_params.append('$filter', filter);
        arr_param.push({ key: '$filter', value: filter });
      }
    }
    if (orderBy) {
      //sf_params.append('$orderby', orderBy);
      arr_param.push({ key: '$orderby', value: orderBy });
    }
    return this.http.get<any>(apiUrl + this.GenericQueryString(arr_param));
  }
  GenericQueryString(arr_key) {
    let queryString = '';
    if (arr_key && arr_key.length > 0) {
      for (let i = 0; i < arr_key.length; i++) {
        queryString += (i == 0 ? '?' : '') + arr_key[i].key + '=' + arr_key[i].value + ((arr_key[i].length != 1 && i != arr_key[i].length) ? '&' : '');
      }
    }
    return queryString;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartConfig, DashboardSettingsModel } from '../model/report-settings';

@Injectable({
  providedIn: 'root'
})
export class ChartCreationService {

  constructor(private http: HttpClient) { }
  getConfigData(entity) {
    return this.http.get<any>("/api/DashboardConfig/GetDashboardConfigData?entity=" + entity).pipe();
  }
  saveDashboardConfig(dashboardConfig) {
    return this.http.post<DashboardSettingsModel>("/api/DashboardConfig/SaveDashboardConfig", dashboardConfig).pipe();
  }

  getChartConfigById(configId) {
    return this.http.get<any>("/api/DashboardConfig/GetChartConfigById?configId=" + configId).pipe();
  }

  saveChartConfig(chartConfig) {
    return this.http.post<ChartConfig>("/api/DashboardConfig/SaveChartConfig", chartConfig).pipe();
  }

  removeChartById(id) {
    return this.http.delete<any>("/api/DashboardConfig/RemoveChartConfigById?id=" + id).pipe();
  }

  getAllChartConfigById(id) {
    return this.http.get<Array<ChartConfig>>("/api/DashboardConfig/getAllChartConfigById?id=" + id).pipe();
  }

  getAllChartConfig() {
    return this.http.get<any>("/api/DashboardConfig/GetAllChartConfig").pipe();
  }

  getChartData(chartConfig) {
    return this.http.post<any>("/api/DashboardConfig/GetChartData", chartConfig).pipe();
  }

  getSearchValues(id, fieldName) {
    return this.http.get<any>("/api/DashboardConfig/GetSearchValues?id=" + id + "&fieldname=" + fieldName).pipe();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../model/gender';
import { EmployeeType } from '../model/EmployeeType';
import { City, Country, State } from '../model/Country';
import { UserCost, UserCostDropdown, UserGoal, Users } from '../users/users';
import { Chartname } from '../model/chartname';
import { Userchartmapping } from '../model/userchartmapping';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  constructor(private http: HttpClient) { }

  saveUser(user) {
    return this.http.post<any>("/api/Users/SaveUser", user).pipe();
  }
  saveUserCost(userCost) {
    return this.http.post<UserCost>("/api/Users/SaveUserCost", userCost).pipe();
  }
  saveUserGoals(userGoals) {
    return this.http.post<UserGoal>("/api/Users/SaveUserGoal", userGoals).pipe();
  }
  getgender() {
    return this.http.get<Array<Gender>>("/api/Users/GetGender").pipe();
  }
  getUsers() {
    return this.http.get<Array<Users>>("/api/Users/GetUsers").pipe();
  }

  getUserCostDropdown() {
    return this.http.get<Array<UserCostDropdown>>("/api/Users/GetUserCostDropdown").pipe();
  }
  getCountries() {
    return this.http.get<Array<Country>>("/api/Users/GetCountries").pipe();
  }

  getStatesByCountryId(countryId) {
    return this.http.get<Array<State>>("/api/Users/GetStatesByCountryId?countryId=" + countryId).pipe();
  }

  getCityByStateId(stateId) {
    return this.http.get<Array<City>>("/api/Users/GetCityByStateId?stateId=" + stateId).pipe();
  }

  getEmployeeTypes() {
    return this.http.get<Array<EmployeeType>>("/api/Users/GetEmployeeTypes").pipe();
  }
  getUserCost(userId) {
    return this.http.get<UserCost>("/api/Users/GetUserCost?userId=" + userId).pipe();
  }
  getUserGoal(userId) {
    return this.http.get<UserGoal>("/api/Users/GetUserGoal?userId=" + userId).pipe();
  }

  getChartName() {
    return this.http.get<Array<Chartname>>("/api/Users/GetChartName").pipe();
  }

  getChartsById(userId) {
    return this.http.get<any>("/api/Users/GetChartsById?userId=" + userId).pipe();
  }

  getHeaderChartNameById(userId) {
    return this.http.get<Array<Userchartmapping>>("/api/Users/GetHeaderChartNameById?userId=" + userId).pipe();
  }

  getDashboardChartNameById(userId) {
    return this.http.get<Array<Userchartmapping>>("/api/Users/GetDashboardChartNameById?userId=" + userId).pipe();
  }

  getUserQuoteChartNameById(userId) {
    return this.http.get<Array<Userchartmapping>>("/api/Users/GetUserQuoteChartNameById?userId=" + userId).pipe();
  }

  saveHeaderChartMapping(userChartMapping) {
    return this.http.post<any>("/api/Users/SaveHeaderChartMapping", userChartMapping).pipe();
  }

  saveDashboardChartMapping(userChartMapping) {
    return this.http.post<any>("/api/Users/SaveDashboardChartMapping", userChartMapping).pipe();
  }

  saveUserQuoteChartMapping(userChartMapping) {
    return this.http.post<any>("/api/Users/SaveUserQuoteChartMapping", userChartMapping).pipe();
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Networking, NetworkingEventMeet } from '../model/networking';
import { Networkingcost } from '../model/networkingcost';
import { Lead } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class AddnetworkingService {

  constructor(public http: HttpClient) { }
  saveNetworking(networking) {
    return this.http.post<Networking>("/api/Networking/saveNetworking", networking).pipe();
  }
  getNetworkingLeads(networkingId) {
    return this.http.get<Array<Lead>>("/api/Networking/GetNetworkingLeads?networkingId=" + networkingId).pipe();
  }
  getNetworkingCost(NetworkingCostId) {
    return this.http.get<Networkingcost>("/api/Networking/GetNetworkingCost?NetworkingCostId=" + NetworkingCostId).pipe();
  }
  getNetworkingEvent(EventId) {
    return this.http.get<NetworkingEventMeet>("/api/Networking/GetNetworkingEventMeet?EventId=" + EventId).pipe();
  }
  getNetworking() {
    return this.http.get<Array<Networking>>("/api/Networking/GetNetworking").pipe();
  }

  getNetworkingById(networkingId) {
    return this.http.get<Networking>("/api/Networking/GetNetworkingById?networkingId=" + networkingId).pipe();
  }
}

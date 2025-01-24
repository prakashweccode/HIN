import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../model/event';
import { Referral } from '../model/referral';
import { Services } from '../model/services';

@Injectable({
  providedIn: 'root'
})
export class AddeventService {

  constructor(public http: HttpClient) { }

  saveEvent(events) {
    return this.http.post<any>("/api/Event/saveEvent", events).pipe();
  }
  getEventById(id) {
    return this.http.get<Events>("/api/Event/GetEventById?id=" + id).pipe();
  }
  getEventByPipeLineGroupId(id) {
    return this.http.get<Array<Events>>("/api/Event/GetEventByPipeLineGroupId?id=" + id).pipe();
  }
  updateEventPipelineId(id, pipelineId) {
    return this.http.patch<Events>("/api/Partner/UpdateEventPipelineId/" + id, pipelineId).pipe();
  }
  getAllEventAppointment(eventId) {
    return this.http.get<Array<Services>>("/api/Services/GetAllEventAppointment?eventId=" + eventId).pipe();
  }
  getAllEventReferral(eventId) {
    return this.http.get<Array<Referral>>("/api/Referral/GetAllEventReferral?eventId=" + eventId).pipe();
  }
  getAllEvents() {
    return this.http.get<Array<Events>>("/api/Event/GetAllEvents").pipe();
  }

}

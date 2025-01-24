import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventResponseDto } from '../model/AppointmentRecurrence';
import { Services } from '../model/services';
import { Todo } from '../todo/todo';

@Injectable({
  providedIn: 'root'
})
export class NewcalendarService {

  constructor(private http: HttpClient) { }

  getAllEventsByRange(request) {
    return this.http.post<Array<EventResponseDto>>("/api/EventRecurrence/SpGetAllCalendarEvents", request).pipe();
  }
  getServiceById(id) {
    return this.http.get<Services>("/api/Services/GetServiceById?id=" + id).pipe();
  }
  //getJobById(id) {
  //  return this.http.get<Newjob>("/api/NewJob/GetJobById?id=" + id).pipe();
  //}
  getTodoById(id) {
    return this.http.get<Todo>("/api/Todo/GetTodoById?todoId=" + id).pipe();
  }
  getServiceRecurrenceEvents() {
    return this.http.get<any>("/api/Todo/GetServiceRecurrenceEvents").pipe();
  }
}

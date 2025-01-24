import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo/todo';
import { Customdropdown } from '../customdropdown/customdropdown';
import { DealContact } from '../contactinformation/contactinformation';
import { EventRecurrenceDto } from '../model/AppointmentRecurrence';

@Injectable({
  providedIn: 'root'
})
export class SfcalendarService {

  constructor(private http: HttpClient) { }
  getRecurrenceEvents() {
    return this.http.get<Array<EventRecurrenceDto>>("/api/Todo/GetRecurrenceEvents").pipe();
  }
  calendarEvents() {
    return this.http.get<any>("/api/Todo/GetCalendarEvents").pipe();
  }
  getStepTypesData() {
    return this.http.get<Array<Customdropdown>>("/api/CustomDropDown/GetCustomDropDown?getApiPath=CustomDropDown/GetStepTypes").pipe();
  }
  UpdateTodoSchedule(id, eventSchedule) {
    return this.http.post<Todo>("/api/Todo/UpdateTodoSchedule/" + id, eventSchedule).pipe();
  }
  UpdateOppStepsSchedule(id, eventSchedule) {
    return this.http.patch<DealContact>("/api/ContactInfo/UpdateOppStepsSchedule/" + id, eventSchedule).pipe();
  }
}

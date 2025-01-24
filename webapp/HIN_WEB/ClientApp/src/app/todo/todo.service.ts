import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Vendor } from '../model/vendor';
import { Days, RecurrenceType } from '../model/AppointmentRecurrence';
import { Lead } from '../model/lead';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  saveTodo(todo) {
    todo.StartDate = todo.StartDate.toLocaleString();
    todo.EndDate = todo.EndDate.toLocaleString();
    return this.http.post<Todo>("/api/Todo/SaveTodo", todo).pipe();
  }
  saveRecurrence(request) {
    return this.http.post<any>("/api/EventRecurrence/saveRecurrence", request);
  }
  getRecurrenceType() {
    return this.http.get<Array<RecurrenceType>>("/api/EventRecurrence/GetRecurrenceType").pipe();
  }
  getTodoByPipeLineGroupId(Id) {
    return this.http.get<Array<Todo>>("/api/Todo/GetTodoByPipeLineGroupId?id=" + Id).pipe();
  }
  getLeadByPipeLineGroupId(id) {
    return this.http.get<Array<Lead>>("/api/Lead/GetLeadByPipeLineGroupId?id=" + id).pipe();
  }
  getToDoStatus() {
    return this.http.get<any>("/api/ContactInfo/GetToDoStatus").pipe();
  }
  getImportance() {
    return this.http.get<any>("/api/Todo/GetImportance").pipe();
  }


  getDays() {
    return this.http.get<Array<Days>>("/api/EventRecurrence/GetDays").pipe();
  }
  getRecurrenceData(recurrenceId) {
    return this.http.get<any>("/api/EventRecurrence/GetRecurrenceData?id=" + recurrenceId).pipe();
  }
  updateTodoPipelineId(id, pipelineId) {
    return this.http.patch<Todo>("/api/Todo/UpdateTodoPipelineId/" + id, pipelineId).pipe();
  }
  updateVendorPipelineId(id, pipelineId) {
    return this.http.patch<Vendor>("/api/Todo/UpdateVendorPipelineId/" + id, pipelineId).pipe();
  }


  updateLeadPipelineId(leadId, pipelineId) {
    return this.http.patch<Lead>("/api/Lead/UpdateLeadPipelineId/" + leadId, pipelineId).pipe();
  }

  updateTodoStatus(id) {
    return this.http.patch<Todo>("/api/Todo/updateTodoStatus/" + id, 1).pipe();
  }
  getTodoById(id) {
    return this.http.get<Todo>("/api/Todo/GetTodoById?todoId=" + id).pipe();
  }
}

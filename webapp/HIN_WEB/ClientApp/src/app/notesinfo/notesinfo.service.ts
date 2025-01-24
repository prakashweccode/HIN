import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesInformation } from './notesinfo';
import { PartCatalog } from '../model/addpartcatalog';

@Injectable({
  providedIn: 'root'
})
export class NotesinfoService {

  constructor(private http: HttpClient) { }
  LoadNotes(entityId, entityTypeId) {
    return this.http.get<Array<NotesInformation>>("/api/NotesInfo/GetEntityNotes?entityId=" + entityId + "&entityTypeId=" + entityTypeId).pipe();
  }
  GetProducts() {
    return this.http.get<Array<PartCatalog>>("/api/PartCatalog/GetPartCatalog").pipe();
  }
  SaveEntityNotes(notesInfo) {
    return this.http.post<NotesInformation>("/api/NotesInfo/SaveEntityNotes", notesInfo).pipe();
  }
}

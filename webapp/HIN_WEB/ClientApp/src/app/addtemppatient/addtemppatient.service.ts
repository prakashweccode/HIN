import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Temppatient } from '../model/temppatient';
import { Templatelist } from '../model/templatelist';

@Injectable({
  providedIn: 'root'
})
export class AddtemppatientService {

  constructor(private http: HttpClient) { }

  getTempPatientById(id) {
    return this.http.get<Temppatient>("/api/Lead/GetTempPatientById?id=" + id).pipe();
  }
  
}

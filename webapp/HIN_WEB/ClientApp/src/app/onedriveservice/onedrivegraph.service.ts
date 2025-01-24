import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as hello from 'hellojs/dist/hello.all.js';
import { Onedriveconfig } from '../helper/onedriveconfig';

@Injectable({
  providedIn: 'root'
})
export class OnedrivegraphService {
  constructor(private http: HttpClient) { }

  getAccessToken() {
    const msft = hello('msft').getAuthResponse();
    const accessToken = msft.access_token;
    return accessToken;

  }

  executeQuery(queryType, query, postBody?, requestHeaders?: HttpHeaders): Observable<any> {
    let newHeaders: HttpHeaders = new HttpHeaders();
    let newToken = this.getAccessToken();
    if (requestHeaders === undefined) {
      newHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + newToken });
    } else {
      newHeaders = requestHeaders.append('Authorization', 'Bearer ' + newToken) ||
        newHeaders.append('Authorization', 'Bearer ' + newToken);
    }
    switch (queryType) {
      case 'GET':
        return this.http.get(query, { headers: newHeaders });
      case 'GET_BINARY':
        return this.http.get(query, { responseType: 'arraybuffer', headers: newHeaders });
      case 'PUT_BINARY':
        newHeaders.append("Content-Type", "application/pdf");
        return this.http.put(query, postBody, { headers: newHeaders });
      case 'PUT':
        return this.http.put(query, postBody, { headers: newHeaders });
      case 'POST':
        return this.http.post(query, postBody, { headers: newHeaders });
      case 'PATCH':
        return this.http.patch(query, postBody, { headers: newHeaders });
      case 'DELETE':
        return this.http.delete(query, { headers: newHeaders });
    }
  }
  ValidateUserInHinPortal(microsoftAccDetails: any) {
    //console.log(microsoftAccDetails);
    return this.http.post<any>("/api/Authentication/ValidateHinPortalAccount", microsoftAccDetails).pipe();
  }
  //CreatePatientAppointmentDirectory(content, practiceName, appDate, patientName) {
  //  debugger;
  //  this.executeQuery('POST', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + practiceName + '/' + appDate + '/' + patientName + ':/children', content).subscribe((result: any) => {
  //    if (result) {
  //      //let subDirectories = ['EMR NO', 'Appointment DOS', 'Provider', 'Additional Documentation'];
  //      let subDirectories = ['Documents'];
  //      subDirectories.forEach(x => {
  //        if (x) {
  //          let subcontent = {
  //            "name": x,
  //            "folder": {},
  //            "@microsoft.graph.conflictBehavior": "rename"
  //          }
  //          this.CreatePatientAppointmentSubDirectory(subcontent, practiceName, appDate, patientName);
  //        }
  //      });
  //    }
  //  }, (error: any) => { }, () => { });
  //}

  CreatePatientAppointmentSubDirectory(content, practiceName, appDate, patientName, userName) {
    this.executeQuery('POST', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + practiceName + '/' + appDate + '/' + userName + '/' + patientName + ':/children', content).subscribe((result: any) => {
      if (result) {
        console.log(result);
      }
    }, (error: any) => { }, () => { });
  }

  checkIfPatientFolderExist(content) {
    let status = '';
    this.executeQuery('GET', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + content.name + ':/').subscribe((result: any) => {

    }, (error: any) => {
      this.CreatePatientEmrDirectory(content);
    }, () => { });
    return status;
  }

  checkIfPraticeFolderExist(content, emrno) {
    let status = '';
    this.executeQuery('GET', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + emrno + '/' + content.name + ':/').subscribe((result: any) => {

    }, (error: any) => {
      this.CreatePracticeDirectory(content, emrno);
    }, () => { });
    return status;
  }

  checkIfAppointmentFolderExist(content, practiceName, appDate, patientName, userName) {
    this.executeQuery('GET', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + practiceName + '/' + appDate + '/' + userName + '/' + patientName + '/Documents').subscribe((result: any) => {
    }, (error: any) => {
      this.CreatePatientAppointmentSubDirectory(content, practiceName, appDate, patientName, userName);
    }, () => { });
  }

  CreatePatientEmrDirectory(content) {
    this.executeQuery('POST', Onedriveconfig.graphV1Url + 'drive/root:/Health:/children', content).subscribe((result: any) => {
      if (result) {
      }
    }, (error: any) => { console.log(error); }, () => { });
  }

  CreatePracticeDirectory(content, emrno) {
    this.executeQuery('POST', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + emrno + ':/children', content).subscribe((result: any) => {
      if (result) {
      }
    }, (error: any) => { console.log(error); }, () => { });
  }

  SaveTemplateForAppointment(content, practiceName, appointmentDate, patientNameEmr, practiceAddress) {
    this.executeQuery('PUT_BINARY', Onedriveconfig.graphV1Url + 'drive/root:/Health/' + practiceAddress + '/' + practiceName + '/' + appointmentDate + '/' + patientNameEmr + '/Documents/' + content.name + ':/content', content.file).subscribe((result: any) => {
      if (result) {
        
      }
    }, (error: any) => { console.log(error); }, () => { });
  }

}

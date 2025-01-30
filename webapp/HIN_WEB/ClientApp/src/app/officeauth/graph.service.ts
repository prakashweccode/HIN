import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthService } from './auth.service';
import { ErrorHandler } from '../helper/ErrorHandler';
import { UserDetail } from '../login/login';
import * as hello from 'hellojs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private graphClient: Client;
  constructor(
    private authService: AuthService,
    private alertsService: ErrorHandler, private http: HttpClient) {
    let loggedUserDetails = <UserDetail>JSON.parse(localStorage.getItem("userDetail"));
    if (loggedUserDetails && loggedUserDetails.User && loggedUserDetails.User.OfficeToken) {
      
      this.graphClient = Client.init({
        authProvider: async (done) => {
          // Get the token from the auth service
          let token = await this.authService.getAccessToken()

            .catch((reason) => {
              done(reason, null);
            });
          if (token) {
            done(null, token);
            authService.authenticated = true;
          } else {
            done("Could not get an access token", null);
          }
          //done(null, loggedUserDetails.User.OfficeToken);
          //authService.authenticated = true;
        }
      })
    }
    else {
      this.graphClient = Client.init({
        authProvider: async (done) => {
          // Get the token from the auth service
          let token = await this.authService.getAccessToken()
            .catch((reason) => {
              done(reason, null);
            });

          if (token) {
            done(null, token);
            authService.authenticated = true;
          } else {
            done("Could not get an access token", null);
          }
        }
      });
    }
  }
  async searchDrive(searchString: string) {
    return await this.graphClient.api("/me/drive/root/search(q='Franklin')").get();
  }

  async getFilteredSharedDrive(request: any) {
    return await this.graphClient.api("/search/query").post(request);
  }
  
  async sendMail(mail): Promise<any> {
    return await this.graphClient.api("/me/sendMail").post(mail);
  }
  async PostUser(request): Promise<any> {
    return await this.graphClient.api("/users").post(request);
  }
  async getMails(): Promise<any> {

    return await this.graphClient.api("/me/messages").get();
  }
  async getEmails(id): Promise<any> {
    return await this.graphClient.api("/me/messages/" + id).expand("attachments").get();
  }

  async getDrive(): Promise<any> {
    return await this.graphClient.api("/me/drive").get();
  }
  async getSharedDrive(): Promise<any> {
    return await this.graphClient.api("/me/drive/sharedWithMe?allowexternal=true").get();
  }
  async updateFile(id, fileName, request): Promise<any> {
    return await this.graphClient.api("/me/drive/items/" + id + ":/" + fileName + ":/content").putStream(request);
  }


  async getOneDriveItems(driveId, id): Promise<any> {
    return await this.graphClient.api("/me/drives/" + driveId + "/items/" + id + "/children").get();
  }
  async getDriveItems(id): Promise<any> {
    return await this.graphClient.api("/me/drives/items/" + id + "/children").get();
  }

  async getItems(parent, id): Promise<any> {
    return await this.graphClient.api("/me/drives/" + parent + "/items/" + id + "/children").get();
  }

  async shareDrive(parent, id, request) {
    return await this.graphClient.api("/me/drives/" + parent + "/items/" + id + "/invite").post(request);
  }

  async AddAccess(id, data): Promise<void> {
    return await this.graphClient.api("/me/drive/items/" + id + "/invite").post(data);
  }

  async getRootItems(): Promise<any> {
    return await this.graphClient.api("/me/drive/root/children").get();

  }
  async SaveFile(path, request) {
    
    return await this.graphClient.api(path).putStream(request);
  }

  async CreateFolder(path, request) {
    
    return await this.graphClient.api(path).post(request);
  }
  
  async getCalendars(): Promise<any> {
    return await this.graphClient.api("/me/calendars").get();
  }
  async getCalendar(id): Promise<any> {
    return await this.graphClient.api("/me/calendars/" + id).get();
  }
  async getCalendarEvents(id, date, clientTimeZone): Promise<void> {
    return await this.graphClient.api("/me/calendars/" + id + "/events?$top=1000&$filter=Start/DateTime ge '" + date + "'").header('Prefer', 'outlook.timezone="' + clientTimeZone + '"').get();
  }

  async getMailFolder(): Promise<any> {
    return await this.graphClient.api("/me/mailFolders").get();
  }

  async getContacts(): Promise<any> {
    return await this.graphClient.api("/me/contacts").get();
  }

  async getMailFolderItems(id, top, skip): Promise<any> {
    return await this.graphClient.api("/me/mailFolders/" + id + "/messages?$top=" + top + "&$skip=" + skip).get();
  }
  async getCalendarEventsByRange(from, to, clientTimeZone): Promise<void> {
    return await this.graphClient.api("me/calendar/events?$filter=start/dateTime ge '" + from + "' and start/dateTime lt '" + to + "'").header('Prefer', 'outlook.timezone="' + clientTimeZone + '"').get();
  }

  async createTenentFolder(request: any) {
    return await this.graphClient.api('/me/drive/items/01SESOOENHWHK3R5OSQBHI34MUSAXKKVBR/children').post(request);
  }

 
}

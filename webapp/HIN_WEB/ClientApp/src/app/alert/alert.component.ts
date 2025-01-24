import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    alertToggle: boolean = false;
    alertHeader: string;
    alertMessage: string;
    alertFooter: string;
    constructor() { }

    ngOnInit() {
    }
    handleAlert(error, title, footer) {
        this.alertHeader = title;
        this.alertFooter = footer;
        if (error.error instanceof ErrorEvent) {
            // client-side error
            this.alertMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            this.alertMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.alertToggle = true;
    }
    handleSuccessAlert(message, title, footer) {
        this.alertHeader = title;
        this.alertFooter = footer;
        this.alertMessage = message;
        this.alertToggle = true;
    }
    closeError() {
        this.alertToggle = false;
    }
}

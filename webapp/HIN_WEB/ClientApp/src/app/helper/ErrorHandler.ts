import { throwError } from "rxjs";

enum ErrorCodes {
  "Invalid data" = 400,
  "Validation issue" = 405,
  "The information you entered does not match what we have in our system.  Please try again.  If it still does not work, please email COVID19results@cdrmhealth.com." = 404,
  "Invalid login attempt" = 401,
  "User not active" = 423,
  "Invalid code" = 412,
  "Internal server error" = 500,
  "Service unavailable" = 503,
  "Email expectation failed" = 417,
  "Please enter required fields" = 416,
  "User already exist" = 406,
  "Error in sending sms" = 409,
  "User not allowed" = 451,
  "<img src='assets/images/popup.png' style='width: 90%' />" = 422
}
export class ErrorHandler {
  handleError(error, title, footer) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = ErrorCodes[error.status];
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status == 409) {
      errorMessage = error.error.detail;
    }
    if (error.status == 422) {
      this.ShowErrorPopup(errorMessage, "", "");
    }
    else {
      this.ShowErrorPopup(errorMessage, title, footer);
    }
  }
  ShowErrorPopup(errorMsg, title, footer) {
    var dvErrorTitle = document.getElementById("dvErrorTitle");
    var dvErrorMessage = document.getElementById("dvErrorMessage");
    var dvErrorFooter = document.getElementById("dvErrorFooter");
    dvErrorTitle.innerHTML = title;
    dvErrorMessage.innerHTML = errorMsg;
    dvErrorFooter.innerHTML = footer;
    document.getElementById("dvErrorModal").style.display = "block";
    return throwError(errorMsg);
  }
  ShowConfirmationDialog(title, confirmationText, confirmationbuttonText, cancelbuttontext) {
    var dvConfirmModalTitle = document.getElementById("dvConfirmModalTitle");
    var dvConfirmModalMessage = document.getElementById("dvConfirmModalMessage");
    var dvConfirmModalFooter = document.getElementById("dvConfirmModalFooter");
    dvConfirmModalTitle.innerHTML = title;
    dvConfirmModalMessage.innerHTML = confirmationText;
    //dvConfirmModalFooter.innerHTML = '<button class="w3-button w3-indigo" (click)="Confirm()" >' + confirmationbuttonText + '</button><button class="w3-button" (click)="Cancel()">' + cancelbuttontext + '</button>';
    document.getElementById("dvConformModal").style.display = "block";
  }
}

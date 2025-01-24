import { Injectable } from "@angular/core";
@Injectable()
export class NotyHelper {
  ShowNoty(message: string) {
    var x = document.getElementById("snackbar") as HTMLDivElement;
    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = message;
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  toggleSide=false;
  ngOnInit(): void {
    this.closeOutlet();
  }
  onDeactivate(elementRef: any) { console.log("onDeactivate");}
  onAttach(elementRef: any) { console.log("onAttach"); }
  onDetach(elementRef: any) { console.log("onDetach"); }
  onActivate(elementRef: any) {
    this.toggleSide = true;
    console.log("activate");
    //elementRef.Toggle.subscribe((event: any) => {
    //  console.log(event);
     
    //});
  }
  closeOutlet() {
    this.router.navigate([
      "../../home",
      {
        outlets: {
          sidenav: null
        }
      }
    ]
    );
  }
}

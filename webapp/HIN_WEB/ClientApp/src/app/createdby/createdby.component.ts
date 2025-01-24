import { Component, Input, OnInit } from '@angular/core';
import { UserDetail } from '../login/login';

@Component({
  selector: 'app-createdby',
  templateUrl: './createdby.component.html',
  styleUrls: ['./createdby.component.css']
})
export class CreatedbyComponent implements OnInit {
  @Input() createdby: string;
  user: UserDetail;
  constructor() { }

  ngOnInit() {
    if (this.createdby) {
      this.createdby = this.createdby;
    }
    else {
      this.user = JSON.parse(localStorage.getItem("userDetail"));
      this.createdby = this.user.User.Email;
    }
  }

}

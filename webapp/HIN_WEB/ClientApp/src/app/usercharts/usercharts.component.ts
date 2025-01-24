import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-usercharts',
  templateUrl: './usercharts.component.html',
  styleUrls: ['./usercharts.component.css']
})
export class UserchartsComponent implements OnInit {

  users: Array<Users> = [];
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  userQuoteToggle(user) {
    if (user && !user.QuoteToggle) {
      user.QuoteToggle = true;
    }
    else {
      user.QuoteToggle = false;
    }
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'oidc-client';
import { UserDetail } from '../login/login';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-assignedto',
  templateUrl: './assignedto.component.html',
  styleUrls: ['./assignedto.component.css']
})
export class AssignedtoComponent implements OnInit {
  users: Array<Users> = [];
  userDetail: UserDetail;
  @Input() assignedTo: number;
  @Output() sendAssignedId = new EventEmitter();
  constructor(private userService: UsersService) { }

  ngOnInit() {
    if (this.assignedTo) {
      this.assignedTo = this.assignedTo;
    }
    else {
      this.userDetail = JSON.parse(localStorage.getItem("userDetail"));
      this.assignedTo = this.userDetail.User.UserId;
    }
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  sendId(id) {
    this.sendAssignedId.emit(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../users/users';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public users: Users = new Users ();

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit() {
  }

  saveUsersInfo() {
    this.userService.saveUsers(this.users).subscribe(data => {
      if (data) {
        this.users = data;
      }
    })
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  checkValidation(obj: any) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj: any) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }

}

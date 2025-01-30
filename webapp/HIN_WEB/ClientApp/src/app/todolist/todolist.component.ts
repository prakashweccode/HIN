import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datashared } from '../helper/datashared';
import { UsersService } from '../users/users.service';
import { TodoService } from '../todo/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public isSecurityEnabled: boolean = true;
  public gridHeaders: Array<any>;
  public dataSource: Array<any>;
  public filterColumns: Array<any>;
  public apiUrl: string;
  public pageSize: number;
  public actions: Array<any>;
  public enableRowNumber: boolean = true;
  public pageLengthOptions: Array<number>;
  public usersList: any;
  public lstToDoStatus: any;
  constructor(public router: Router, public dataShared: Datashared, private userService: UsersService, public toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoStatus().subscribe(data => {
      if (data) {
        this.usersList = data.Item1.map(item => ({
          id: item.UserId,
          Name: item.FirstName
        }));
        this.lstToDoStatus = data.Item2.map(item => ({
          id: item.Id,
          Name: item.Name
        }));
      }

      // Initializes the grid headers for displaying To do data in the table.
      this.gridHeaders = [
        { displayName: 'To Do Number', propertyName: 'TodoNumber', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
        { displayName: 'Name', propertyName: 'TodoName', dataType: 'string', secondPropertyName: '', filter: '', isLink: true, serializeArray: null },
        { displayName: 'Subject', propertyName: 'Subject', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Importance', propertyName: 'ImportanceId', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Status', propertyName: 'CompletedBy', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.lstToDoStatus },
        { displayName: 'Location', propertyName: 'LocationTitle', dataType: 'string', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'Assigned To', propertyName: 'AssignedTo', dataType: 'number', secondPropertyName: '', filter: '', isLink: false, serializeArray: this.usersList },
        { displayName: 'Start Date', propertyName: 'StartDate', dataType: 'datetime', secondPropertyName: '', filter: '', isLink: false, serializeArray: null },
        { displayName: 'End Date', propertyName: 'EndDate', dataType: 'datetime', secondPropertyName: '', filter: '', isLink: false, serializeArray: null }
      ];

    }, err => { }, () => { });
    // Initializes the data source and filter columns for the grid or table.
    this.dataSource = new Array<any>();
    this.filterColumns = [

      { column: "Name", value: "", type: "contains" },
      { column: "Importance", value: "", type: "contains" },
      { column: "CompletedBy", value: "", type: "contains" },
      { column: "Subject", value: "", type: "contains" },
      { column: "AssignedTo", value: "", type: "contains" },
      { column: "CreatedOn", value: "", type: "contains" }
    ];
    this.actions = [
    ];
    this.pageLengthOptions = [25, 100, 250];
  }
  // Method to handle adding a new Todo
  addTodo() {
    this.dataShared.setPermissionBaseValue("5.2");
    this.router.navigate(['/todo']);
  }
  // Method to edit Todo
  editTodo(evt) {
    this.dataShared.setPermissionBaseValue("5.2");
    this.dataShared.setValue(evt.dataRow);
    this.router.navigate(['/todo']);
  }
}

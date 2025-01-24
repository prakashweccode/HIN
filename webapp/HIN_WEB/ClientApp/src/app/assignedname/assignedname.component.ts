import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deal } from '../model/deal';
import { Assignedname } from './assignedname';
import { AssignednameService } from './assignedname.service';

@Component({
  selector: 'app-assignedname',
  templateUrl: './assignedname.component.html',
  styleUrls: ['./assignedname.component.css']
})
export class AssignednameComponent implements OnInit {
  @Input() selectedValue: Deal;
  assignedNames: Array<Assignedname> = [];
  selectedAssignedName: Assignedname = new Assignedname();
  @Output() sendAssignedValue = new EventEmitter();
  constructor(public assigneNameService: AssignednameService) { }

  ngOnInit() {
    this.getUserandPartnerName();
    if (this.selectedValue) {
      this.selectedAssignedName.Id = this.selectedValue.AssignedTo;
      this.selectedAssignedName.Name = this.selectedValue.AssignedName;
      this.selectedAssignedName.Type = this.selectedValue.AssignedType;
    }
  }

  getUserandPartnerName() {
    this.assigneNameService.getUserandPartnerName().subscribe(data => {
      this.assignedNames = data;
    }, err => { }, () => { });
  }

  compareFn(assignedName, selectedAssignedName): boolean {
    if (assignedName && selectedAssignedName)
      return (assignedName.Id == selectedAssignedName.Id && assignedName.Type == selectedAssignedName.Type);
  }

  sendAssignedName(assignedName) {
    this.sendAssignedValue.emit(assignedName);
  }

}

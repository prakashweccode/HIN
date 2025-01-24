import { Component, OnInit, Input } from '@angular/core';
import { NotesInformation } from './notesinfo';
import { NotesinfoService } from './notesinfo.service';

@Component({
  selector: 'app-notesinfo',
  templateUrl: './notesinfo.component.html',
  styleUrls: ['./notesinfo.component.css']
})
export class NotesinfoComponent implements OnInit {
  @Input() notesDataSource: Array<NotesInformation> = [];
  @Input() entityType: any;
  @Input() entityId: number;
  @Input() basePermission: string;

  public notesInformation = new NotesInformation();
  toggle: boolean = false;
  constructor(private notesService: NotesinfoService) { }

  ngOnInit() {
    //if (this.entityId && this.entityId > 0) {
    //  this.LoadNotes(this.entityId, this.entityType);
    //}
  }
  
  addNewNotes() {
    this.notesInformation = new NotesInformation();
    this.toggle = true;
  }
  closeToggle() {
    this.toggle = false;
  }
  saveEntityNotes(notesInfo) {
    notesInfo.EntityTypeId = this.entityType;
    notesInfo.EntityId = this.entityId;
    this.notesService.SaveEntityNotes(notesInfo).subscribe(data => {
      if (data) {
        this.notesDataSource.push(data);
        this.toggle = false;
      }
    }, err => { }, () => { });
  }
  ViewNote(note) {
    this.notesInformation = note;
    this.toggle = true;
  }
}

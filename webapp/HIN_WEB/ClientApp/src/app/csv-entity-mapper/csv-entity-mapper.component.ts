import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MappedColumns } from '../import/import';

@Component({
  selector: 'app-csv-entity-mapper',
  templateUrl: './csv-entity-mapper.component.html',
  styleUrls: ['./csv-entity-mapper.component.css']
})
export class CsvEntityMapperComponent implements OnInit {
  @Input() entityColumns: Array<string>;
  @Input() requiredColumns: Array<string>;
  @Input() fileColumns: Array<string>;
  @Output() emitMappedColumn = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  mapColumns(entityColumn, evt) {
    let mappedColumn = new MappedColumns();
    mappedColumn.TableColumn = entityColumn;
    mappedColumn.FileColumn = evt.target.value;
    this.emitMappedColumn.emit(mappedColumn);
  }
  checkRequired(data) {
    let requiredCheck = this.requiredColumns.filter(x => x == data);
    if (requiredCheck.length > 0)
      return true;
    else
      return false;
  }
}
